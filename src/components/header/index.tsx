const Header = () => {
  return (
    <div className="h-22 text-center text-theme text-0">
      <span className="inline-block align-top mt-3 w-15 h-16 mr-[9px] bg-image-@/components/header/logo bg-[size:30px_32px]"></span>
      <h1 className="inline-block align-top lh-22 text-4xl">
        {import.meta.env.VITE_APP_TITLE}
      </h1>
    </div>
  );
};

export default Header;
