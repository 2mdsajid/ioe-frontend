interface SubjectInfo {
  slug: string;
  name: string;
}

interface SubjectSelectorProps {
  subjects: SubjectInfo[];
  selectedSubject: string;
  onSelectSubject: (slug: string) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ 
  subjects, 
  selectedSubject, 
  onSelectSubject 
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
      {subjects.map(({ slug, name }) => (
        <button
          key={slug}
          onClick={() => onSelectSubject(slug)}
          className={`
            px-5 py-2.5 text-[9px] font-black uppercase tracking-[0.15em] rounded-xl transition-all duration-300
            ${selectedSubject === slug 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200 scale-100' 
              : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
            }
          `}
        >
          {name.replace('_',' ')}
        </button>
      ))}
    </div>
  );
};

export default SubjectSelector;