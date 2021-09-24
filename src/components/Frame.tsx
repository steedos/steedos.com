// @flow
import * as React from "react";
import styled from "styled-components";

// This wrapper allows us to pass non-standard HTML attributes through to the DOM element
// https://www.styled-components.com/docs/basics#passed-props
const Iframe = (props) => <iframe title="Embed" {...props} />;

type Props = {
  src?: string,
  border?: boolean,
  title?: string,
  icon?: any,
  canonicalUrl?: string,
  isSelected?: boolean,
  width?: string,
  height?: string,
  forwardedRef: any,
  theme?:any
};

class Frame extends React.Component<Props> {
  forwardedRef: any;

  render() {
    const {
      border,
      width = "100%",
      height = "400px",
      forwardedRef,
      icon,
      title,
      canonicalUrl,
      isSelected,
      theme,
      src,
    } = this.props;
    const Component = border ? StyledIframe : "iframe";
    const withBar = !!(icon || canonicalUrl);

    return (
      <Rounded
        width={width}
        height={height}
        $withBar={withBar}
        className={isSelected ? "ProseMirror-selectednode" : ""}
        theme={theme}
      >
        <Component
            ref={forwardedRef}
            $withBar={withBar}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            width={width}
            height={height}
            type="text/html"
            frameBorder="0"
            title="embed"
            loading="lazy"
            src={src}
            allowFullScreen
          />
      </Rounded>
    );
  }
}

const Rounded: any = styled.div`
  border: 1px solid ${(props) => props.theme.embedBorder};
  border-radius: 6px;
  overflow: hidden;
  width: ${(props: any) => props.width};
  height: ${(props: any) => (props.$withBar ? props.height + 28 : props.height)};
`;

const Open: any = styled.a`
  color: ${(props) => props.theme.textSecondary} !important;
  font-size: 13px;
  font-weight: 500;
  align-items: center;
  display: flex;
  position: absolute;
  right: 0;
  padding: 0 8px;
`;

const Title: any = styled.span`
  font-size: 13px;
  font-weight: 500;
  padding-left: 4px;
`;

const Bar: any = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.embedBorder};
  background: ${(props) => props.theme.secondaryBackground};
  color: ${(props) => props.theme.textSecondary};
  padding: 0 8px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  user-select: none;
`;

const StyledIframe: any = styled(Iframe)`
  border-radius: ${(props) => (props.$withBar ? "3px 3px 0 0" : "3px")};
  display: block;
`;

export default React.forwardRef<Props, typeof Frame>((props, ref) => (
  <Frame {...props} forwardedRef={ref} />
));
