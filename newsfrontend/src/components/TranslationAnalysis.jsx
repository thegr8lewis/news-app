
import { Gauge, CircleAlert, CheckCircle, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';

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
      return <div className="whitespace-pre-wrap text-slate-700">{content}</div>;
    }
    
    let processedContent = content;
    problematicSections.forEach(section => {
      processedContent = processedContent.replace(
        section.text, 
        `<mark class="bg-gradient-to-r from-amber-100 to-yellow-100 border-l-4 border-amber-400 px-2 py-1 rounded-r-md shadow-sm" data-section-id="${section.id}">${section.text}</mark>`
      );
    });
    
    return <div className="whitespace-pre-wrap text-slate-700" dangerouslySetInnerHTML={{ __html: processedContent }} />;
  };

  const getAccuracyColor = (score) => {
    if (score >= 0.9) return 'from-emerald-500 to-teal-500';
    if (score >= 0.7) return 'from-blue-500 to-cyan-500';
    if (score >= 0.5) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getAccuracyBgColor = (score) => {
    if (score >= 0.9) return 'from-emerald-50 to-teal-50';
    if (score >= 0.7) return 'from-blue-50 to-cyan-50';
    if (score >= 0.5) return 'from-amber-50 to-orange-50';
    return 'from-red-50 to-pink-50';
  };

  return (
    <div className="relative mt-6 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-2xl"></div>
      
      {/* Glassmorphism container */}
      <div className="relative backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/50 shadow-xl shadow-slate-200/50">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Gauge className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Translation Quality Analysis
              </h4>
              <p className="text-sm text-slate-500 font-medium">{getLanguageName(language)}</p>
            </div>
          </div>
          
          <div className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full border border-indigo-200">
            <span className="text-sm font-semibold text-indigo-700">AI Powered</span>
          </div>
        </div>
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          
          
          {/* Review Status Card */}
          <div className={`relative p-5 rounded-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
            analysis.needs_human_review 
              ? 'bg-gradient-to-br from-amber-50 to-orange-50' 
              : 'bg-gradient-to-br from-emerald-50 to-teal-50'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {analysis.needs_human_review ? (
                    <CircleAlert className="h-5 w-5 text-amber-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  )}
                  <span className="text-sm font-semibold text-slate-600">Review Status</span>
                </div>
                <span className={`text-2xl font-bold ${
                  analysis.needs_human_review ? 'text-amber-700' : 'text-emerald-700'
                }`}>
                  {analysis.needs_human_review ? 'Required' : 'Complete'}
                </span>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                analysis.needs_human_review ? 'bg-amber-400' : 'bg-emerald-400'
              } animate-pulse`}></div>
            </div>
          </div>
          
          {/* Issues Found Card */}
          <div className="relative p-5 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-purple-500" />
                  <span className="text-sm font-semibold text-slate-600">Issues Found</span>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-purple-700">
                    {analysis.problematic_sections?.length || 0}
                  </span>
                  <span className="text-sm font-medium text-purple-500">issues</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Problematic Sections */}
        {analysis.problematic_sections?.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h5 className="text-lg font-bold text-slate-800">Issues Requiring Attention</h5>
            </div>
            
            <div className="space-y-3">
              {analysis.problematic_sections.map((section, i) => (
                <div key={i} className="group relative p-5 rounded-xl bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border border-amber-200/50 shadow-md hover:shadow-lg transition-all duration-300">
                  {/* Issue number badge */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-white">{i + 1}</span>
                  </div>
                  
                  <div className="space-y-3 ml-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md">Original</span>
                      </div>
                      <p className="text-slate-800 bg-white/50 p-3 rounded-lg border border-slate-200">{section.original}</p>
                    </div>
                    

                    
                    <div className="flex items-start space-x-2 p-3 bg-red-50/70 rounded-lg border border-red-200">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-700 font-medium">{section.issue}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    

      </div>
    </div>
  );
};

export default TranslationAnalysis;