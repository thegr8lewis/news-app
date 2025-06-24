import { Gauge, CircleAlert, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

const TranslationAnalysis = ({ analysis, language, originalContent, translatedContent }) => {
  if (!analysis) return null;

  const getLanguageName = (code) => {
    const names = {
      'en': 'English',
      'so': 'Somali',
      'sw': 'Kiswahili'
    };
    return names[code] || code;
  };

  const renderContentWithHighlights = (content, problematicSections = []) => {
    if (!problematicSections.length) {
      return <div className="whitespace-pre-wrap">{content}</div>;
    }
    
    let processedContent = content;
    problematicSections.forEach(section => {
      processedContent = processedContent.replace(
        section.text, 
        `<mark class="bg-yellow-100 border-l-4 border-yellow-500 px-1" data-section-id="${section.id}">${section.text}</mark>`
      );
    });
    
    return <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: processedContent }} />;
  };

  return (
    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mt-4">
      <h4 className="font-medium text-slate-800 mb-3 flex items-center">
        <Gauge className="h-5 w-5 text-blue-500 mr-2" />
        Translation Quality Analysis ({getLanguageName(language)})
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg flex items-start">
          <Gauge className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
          <div>
            <p className="text-xs text-blue-600 font-medium">Accuracy Score</p>
            <p className="text-xl font-bold">
              {Math.round(analysis.accuracy_score * 100)}%
            </p>
          </div>
        </div>
        
        <div className={`p-3 rounded-lg flex items-start ${
          analysis.needs_human_review ? 'bg-amber-50' : 'bg-green-50'
        }`}>
          {analysis.needs_human_review ? (
            <CircleAlert className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
          )}
          <div>
            <p className={`text-xs font-medium ${
              analysis.needs_human_review ? 'text-amber-600' : 'text-green-600'
            }`}>
              Human Review Needed
            </p>
            <p className="text-xl font-bold">
              {analysis.needs_human_review ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
        
        <div className="bg-purple-50 p-3 rounded-lg flex items-start">
          <AlertTriangle className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
          <div>
            <p className="text-xs text-purple-600 font-medium">Issues Found</p>
            <p className="text-xl font-bold">
              {analysis.problematic_sections?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {analysis.problematic_sections?.length > 0 && (
        <div className="mt-4 space-y-4">
          <h5 className="font-medium">Problematic Sections:</h5>
          {analysis.problematic_sections.map((section, i) => (
            <div key={i} className="bg-amber-50 p-3 rounded-lg">
              <div className="font-semibold">Original:</div>
              <p className="mb-2">{section.original}</p>
              <div className="font-semibold">Translated (Score: {section.score}):</div>
              <p className="text-amber-800">{section.translated}</p>
              <div className="mt-1 text-sm text-amber-600">{section.issue}</div>
            </div>
          ))}
        </div>
      )}
    
      {analysis.needs_human_review && (
        <div className="mt-3 bg-red-50 border-l-4 border-red-500 p-3 rounded-r">
          <p className="text-sm text-red-700 font-medium flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Human review recommended for highlighted sections
          </p>
        </div>
      )}
    </div>
  );
};

export default TranslationAnalysis;