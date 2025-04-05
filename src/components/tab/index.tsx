import { NavLink } from "react-router-dom";

const tabs = [
  {
    name: "推荐",
    path: "/recommend",
  },
  {
    name: "歌手",
    path: "/singer",
  },
  {
    name: "排行",
    path: "/top-list",
  },
  {
    name: "搜索",
    path: "/search",
  },
];

const Tab = () => {
  return (
    <div className="flex h-22 lh-22 text-7">
      {tabs.map((item) => (
        <NavLink className="flex-1 text-center" key={item.path} to={item.path}>
          {({ isActive }) => (
            <span
              className={`${
                isActive && "border-b-2 border-solid border-theme text-theme"
              } pb-[5px] text-text-l`}
            >
              {item.name}
            </span>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default Tab;
