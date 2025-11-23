/**
 * ProgressSteps Component
 * Displays the current step indicator for multi-step forms
 */

import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
  steps: string[];
  className?: string;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep,
  steps,
  className = '',
}) => {
  return (
    <div className={`flex justify-between gap-4 ${className}`}>
      {steps?.map((stepName, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={stepNumber} className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                ${
                  isActive
                    ? 'bg-[#01B6FF] text-white'
                    : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                }`}
            >
              {isCompleted ? '✓' : stepNumber}
            </div>
            <p
              className={`text-sm mt-2 text-center ${
                isActive ? 'text-[#01B6FF] font-semibold' : 'text-gray-500'
              }`}
            >
              {stepName}
            </p>
          </div>
        );
      })}
    </div>
  );
};
