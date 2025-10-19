/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  step1Schema,
  step2Schema,
  step3Schema,
} from "@/app/register-boat/schema/registerBoatSchema";
import CustomContainer from "@/components/CustomComponents/CustomContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import Step1Form from "../Step1Form/Step1Form";
import Step2Form from "../Step2Form/Step2Form";
import Step3Form from "../Step3Form/Step3Form";
import { Button } from "@/components/ui/button";

import boatPreview from "@/assets/register-boat/boatPreview.svg";
import { ArrowRight } from "lucide-react";

const steps = [
  { id: 1, label: "Select Package", key: "selectPackage" },
  { id: 2, label: "Boat Information", key: "boatInfo" },
  { id: 3, label: "Seller Information", key: "sellerInfo" },
  { id: 4, label: "Pay & Post", key: "payPost" },
];

const RegisterBoatForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  //Combine all schemas
  const combineSchema = z.object({
    ...step1Schema.shape,
    ...step2Schema.shape,
    ...step3Schema.shape,
  });

  const form = useForm({
    resolver: zodResolver(combineSchema),
    mode: "onChange",
    defaultValues: {
      moreDetails: [],
      mediaGallery: [],
      coverPhoto: "",
    },
  });

  const { handleSubmit, watch, getValues, trigger } = form;

  const handleNext = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(["selectedPackage"]);
    } else if (currentStep === 2) {
      isValid = await trigger([
        "buildYear",
        "make",
        "model",
        "length",
        "beam",
        "maxDraft",
        "class",
        "material",
        "fuelType",
        "numEngines",
        "numCabins",
        "numHeads",
        "hours",
        "make2",
        "model2",
        "totalPower",
        "propellerType",
        "condition",
        "price",
        "city",
        "state",
        "zip",
        "name",
        "description",
      ]);
    } else if (currentStep === 3) {
      isValid = await trigger([
        "firstName",
        "lastName",
        "contactNumber",
        "country",
        "city",
        "state",
        "zip",
        "username",
        "password",
        "confirmPassword",
      ]);
      if (isValid) {
        setShowPaymentModal(true);
        return;
      }
    }
    if (isValid && currentStep < 3) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePaymentSubmit = (paymentData: any) => {
    const allFormData = getValues();

    const formData = new FormData();

    Object.entries(allFormData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        // Handle arrays (moreDetails, mediaGallery)
        if (Array.isArray(value)) {
          if (key === "moreDetails") {
            value.forEach((item: any, index: number) => {
              formData.append(`${key}[${index}][title]`, item.title || "");
              formData.append(
                `${key}[${index}][description]`,
                item.description || ""
              );
            });
          } else if (key === "mediaGallery") {
            value.forEach((image: string, index: number) => {
              formData.append(`${key}[${index}]`, image);
            });
          }
        } else {
          formData.append(key, String(value));
        }
      }
    });

    // Append payment details
    Object.entries(paymentData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (!Array.isArray(value)) {
          formData.append(`payment_${key}`, String(value));
        }
      }
    });

    console.log("Complete Form Submission (FormData):", formData);

    // Log FormData entries for better visibility
    console.log("FormData entries:");
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}: ${value}`);
    }

    return formData;
  };

  const handlePaymentSuccess = () => {
    setCompletedSteps([...completedSteps, 3]);
    alert("Listing posted successfully!");
  };

  return (
    <div>
      <CustomContainer>
        <div className="rounded-lg bg-[#F4F4F4] p-3 sm:p-5 md:p-8">
          {/* Heading  */}
          <div className="flex items-center gap-3 flex-wrap justify-between">
            <h1 className="text-lg sm:text-3xl font-semibold">
              Listing Progress
            </h1>
            <span className="font-medium">Step {currentStep}</span>
          </div>
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center md:items-start flex-1"
              >
                {/* {idx < steps.length - 1 && ( */}
                <div
                  className={`h-2  rounded-full w-full ${
                    completedSteps.includes(step.id)
                      ? "bg-blue-600"
                      : "bg-gray-200"
                  }`}
                  style={{ minWidth: "60px" }}
                />
                {/* )}   */}
                <h1
                  className={`text-base lg:text-lg text-[#6C6F6F] mt-2 text-left hidden md:block ${
                    currentStep === step.id || completedSteps.includes(step.id)
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {step.label}
                </h1>
                <div
                  className={`w-8 h-8 mt-2 rounded-full flex items-center justify-center font-semibold text-sm md:hidden ${
                    completedSteps.includes(step.id)
                      ? "bg-blue-600 text-white"
                      : currentStep === step.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {completedSteps.includes(step.id) ? "✓" : step.id}
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-3 gap-6">
            {/* Form */}
            <div
              className={`${currentStep === 1 ? "col-span-3" : "col-span-2"}`}
            >
              <div>
                <FormProvider {...form}>
                  {currentStep === 1 && <Step1Form />}
                  {currentStep === 2 && <Step2Form />}
                  {currentStep === 3 && <Step3Form />}
                </FormProvider>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <span>Next </span>
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className={`${currentStep === 1 ? "hidden" : "block"}`}>
              <div className="p-4 sticky top-4">
                <h3 className="font-semibold mb-4">Preview</h3>
                <div className="bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={boatPreview}
                    alt="Boat preview"
                    width={400}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-sm">● Verify</span>
                  </div>
                  <h4 className="font-semibold text-sm">
                    2019 Viking 50 Enclosed Flybridge
                  </h4>
                  <div className="flex gap-4 text-xs text-gray-600">
                    <span>Make: Viking</span>
                    <span>Model: 50</span>
                    <span>Year: 2019</span>
                  </div>
                  <p className="text-blue-600 font-semibold text-sm">
                    Price: $1,195,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default RegisterBoatForm;
