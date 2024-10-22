import React, { useState, useEffect } from 'react';
import { Liquid } from 'liquidjs';

interface LiquidTemplateProps {
  component: any;
  data?: Record<string, any>;
  className?: string;
  style?: React.CSSProperties;
}

const RenderLiquidComponent: React.FC<LiquidTemplateProps> = ({ component, data, className, ...props }) => {
  const [generatedHtml, setGeneratedHtml] = useState<string>('');

  useEffect(() => {
    const generateHtml = async () => {
      const { _id, type, tailwind, html, liquid_template } = component;

      if (type === 'html') {
        setGeneratedHtml(`
          <style>${tailwind}</style>
          ${html}
        `);
      } else if (type === 'liquid') {
        const engine = new Liquid();
        const liquidHtml = await engine.parseAndRender(liquid_template, data);
        setGeneratedHtml(`
          <style>${tailwind}</style>
          ${liquidHtml}
        `);
      } else {
        setGeneratedHtml('Error rendering liquid.');
      }
    };

    generateHtml();
  }, [component, data]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: generatedHtml }}
      className={`builder-component builder-component-${component._id} ${className}`}
      {...props}
    />
  );
};

export default RenderLiquidComponent;
