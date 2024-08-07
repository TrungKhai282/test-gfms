import { theme } from "antd";
import NextTopLoader from "nextjs-toploader";

const { useToken } = theme;

const TopLoader = () => {
  const { token } = useToken();

  const COLOR = token.colorPrimary;
  const INITIAL_POSITON = 0.08;
  const CRAWL_SPEED = 200;
  const HEIGHT = 3;
  const EASING = "ease";
  const SPEED = 200;
  const Z_INDEX = 1600;

  return (
    <NextTopLoader
      color={COLOR}
      initialPosition={INITIAL_POSITON}
      crawlSpeed={CRAWL_SPEED}
      height={HEIGHT}
      crawl={true}
      showSpinner={false}
      easing={EASING}
      speed={SPEED}
      zIndex={Z_INDEX}
    />
  );
};

export default TopLoader;
