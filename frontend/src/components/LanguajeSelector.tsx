import React from "react";

type OnClickLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => void;

interface RenderLanguageSelectorProps {
  onClickLanguageChange: OnClickLanguage;
}

const RenderLanguageSelector: React.FC<RenderLanguageSelectorProps> = ({
  onClickLanguageChange,
}) => {
  return (
    <select className="bg-black" onChange={onClickLanguageChange}>
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="eus">Basque</option>
    </select>
  );
};

export default RenderLanguageSelector;
