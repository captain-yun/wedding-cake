import useSignupStore from '@/store/signup'

export default function ProgressBar() {
  const { currentStep, currentSubStep, steps } = useSignupStore()
  const currentStepData = steps[currentStep]
  
  const mainProgress = ((currentStep - 1) / Object.keys(steps).length) * 100
  const subProgress = currentStepData.subSteps > 1 
    ? (currentSubStep / currentStepData.subSteps) * (100 / Object.keys(steps).length)
    : 0
  const totalProgress = mainProgress + subProgress

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">
          {currentStepData.name}
          {currentStepData.subSteps > 1 && currentStepData.subStepNames && 
            ` - ${currentStepData.subStepNames[currentSubStep - 1]}`
          }
        </span>
        <span className="text-sm text-gray-600">
          {currentStep}/{Object.keys(steps).length}
          {currentStepData.subSteps > 1 && 
            ` (${currentSubStep}/${currentStepData.subSteps})`
          }
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${totalProgress}%` }}
        />
      </div>
    </div>
  )
} 