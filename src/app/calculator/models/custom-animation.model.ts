export interface CustomAnimation {
  duration?: number; // ms
  name?: string;
  delay?: number; // ms
  timing?: 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}

export const DefaultCustomAnimation: CustomAnimation = {
  duration: 300,
  delay: 100,
  timing: 'ease-in-out',
};
