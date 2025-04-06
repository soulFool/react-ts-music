export type Props = { title?: string };

const Loading = ({ title = '加载中...' }: Props) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-z-0">
      <div className="text-center">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="22"
            fill="none"
            stroke-width="3"
            stroke="#3be6cb"
            stroke-dasharray="34"
            stroke-linecap="round"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              values="0 25 25; 360 25 25"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke"
              values="#3be6cb; #02bcfe; #3be6cb"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="25"
            cy="25"
            r="12"
            fill="none"
            stroke-width="3"
            stroke="#02bcfe"
            stroke-dasharray="19"
            stroke-linecap="round"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="360 25 25"
              to="0 25 25"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke"
              values="#02bcfe; #3be6cb; #02bcfe"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <p className="lh-10 text-6 text-text-l">{title}</p>
      </div>
    </div>
  );
};

export default Loading;
