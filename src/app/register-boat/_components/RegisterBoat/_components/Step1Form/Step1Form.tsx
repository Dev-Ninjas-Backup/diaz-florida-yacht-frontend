import { subscriptionPlans } from "@/assets/demo-datas/demodata";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormContext } from "react-hook-form";
import { IoCheckmarkCircle } from "react-icons/io5";

const Step1Form = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const selectedPackage = watch("selectedPackage");
  return (
    <div className="space-y-6 mt-10">
      <h3 className="text-lg font-semibold">Select a Package</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative pb-16 px-3 bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer ${
              selectedPackage === plan.id
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "hover:shadow-lg"
            }`}
            onClick={() => setValue("selectedPackage", plan.id)}
          >
            {/* Featured Badge */}
            {plan.featured && plan.featuredLabel && (
              <div className="absolute top-4 -right-7 z-10 rotate-45">
                <div className="bg-gradient-to-br from-green-400 to-green-600 text-white text-xs font-bold px-6 py-2 rounded-bl-2xl shadow-lg transform rotate-0">
                  {plan.featuredLabel}
                </div>
              </div>
            )}

            {/* Card Content */}
            <div className="p-4">
              {/* Header */}
              <div className="mb-3 border-b border-gray-200 pb-3">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 text-base sm:text-lg">
                    /{plan.billingCycle}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-3 sm:mb-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <IoCheckmarkCircle className="text-gray-500 text-xl sm:text-2xl flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-5 left-0  w-full px-3">
                <Button
                  type="button"
                  variant={selectedPackage === plan.id ? "default" : "outline"}
                  className={`w-full ${
                    selectedPackage === plan.id && "bg-[#006EF0]"
                  }`}
                  onClick={() => setValue("selectedPackage", plan.id)}
                >
                  {selectedPackage === plan.id ? "Selected" : "Select"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {errors.selectedPackage && (
        <p className="text-red-500 text-sm">
          {/* {errors.selectedPackage.message as string} */}
          Please select a package
        </p>
      )}
    </div>
  );
};

export default Step1Form;
