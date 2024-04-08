import Tag from 'components/Label/Tag';
import React from 'react';
import { LanguageType } from 'src/constants/global.types';

interface IntroductionProps {
  data: any;
  language: LanguageType;
}

const Introduction: React.FC<IntroductionProps> = ({ data, language }) => {
  const selectedLanguage =
    data.languages.find((l) => l.shortLang == language) ||
    data.languages.find((l) => l.isMainLanguage);
  return (
    <div className="p-6 w-full flex flex-col gap-3">
      <div>
        {data.tags.map((tag, index) => {
          return <Tag key={index}>{tag[selectedLanguage.shortLang]}</Tag>;
        })}
      </div>

      <span className='text-base text-[#61646B]'>{data[selectedLanguage.shortLang]?.description} </span>
    </div>
  );
};

export default Introduction;
