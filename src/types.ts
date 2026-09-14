export type Language = 
  | 'python'
  | 'javascript'
  | 'typescript'
  | 'bash'
  | 'termux'
  | 'sql'
  | 'go'
  | 'rust'
  | 'cpp'
  | 'html_css'
  | 'docker';

export type Category = 
  | 'security'
  | 'python_core'
  | 'termux_tools'
  | 'networking'
  | 'web_dev'
  | 'algorithms'
  | 'database'
  | 'system_admin'
  | 'data_processing';

export type Difficulty = 'مبتدئ' | 'متوسط' | 'متقدم';

export type Platform = 'all' | 'termux' | 'linux' | 'windows' | 'browser';

export interface Snippet {
  id: string;
  title: string;
  description: string;
  language: Language;
  category: Category;
  difficulty: Difficulty;
  platform: Platform;
  code: string;
  explanation: string;
  securityWarning?: string;
  outputExample?: string;
  tags: string[];
  isDefensiveSecurity?: boolean;
}

export interface PythonFunctionDoc {
  name: string;
  syntax: string;
  category: 'built-in' | 'string' | 'list' | 'dict' | 'math' | 'security' | 'io';
  description: string;
  parameters: string[];
  returnValue: string;
  codeExample: string;
  defensiveTip?: string;
}

export interface SecurityVulnerabilityDefense {
  id: string;
  title: string;
  owaspCategory: string;
  severity: 'حرج' | 'عالي' | 'متوسط' | 'منخفض';
  description: string;
  vulnerableCode: {
    language: string;
    code: string;
    explanation: string;
  };
  defensiveCode: {
    language: string;
    code: string;
    explanation: string;
  };
  remediationSteps: string[];
  safetyAdvisory: string;
}

export type TermuxCategory = 
  | 'package_manager'
  | 'network_audit'
  | 'file_security'
  | 'python_termux'
  | 'system_monitoring'
  | 'termux_api'
  | 'git_dev'
  | 'nodejs_web'
  | 'remote_ssh'
  | 'hardware_sensor';

export interface TermuxCommandItem {
  id: string;
  command: string;
  title: string;
  category: TermuxCategory | string;
  platformTarget: '📱 Termux (أندرويد)' | '💻 لينكس / سيرفر' | '📱💻 كلاهما';
  description: string;
  prerequisites?: string;
  outputPreview?: string;
  safetyLevel: 'آمن تماماً' | 'يتطلب حذر' | 'صلاحيات خاصة';
  notes: string;
}
