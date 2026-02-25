'use client';

import PreviewSection from '@/app/register-boat/_components/Preview/PreviewSection';
import Step2Form from '@/app/register-boat/_components/RegisterBoat/_components/Step2Form/Step2Form';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import { Button } from '@/components/ui/button';
import { step2Schema } from '@/lib/validations/boat-registration-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import EditModeForm from './EditModeForm';

import {
  createBoatListing,
  updateBoatListing,
} from '@/services/seller/boat-listing';
import { BoatDetail } from '@/types/boat-detail-types';
import { FieldLimitations } from '@/types/subscription-types';
import { useState } from 'react';

interface BoatListingFormProps {
  mode: 'create' | 'edit';
  boatData?: BoatDetail;
}

export default function BoatListingForm({
  mode,
  boatData,
}: BoatListingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  const fieldLimitations: FieldLimitations = {
    picLimit: 50,
    wordLimit: 5000,
  };

  const handleDeleteImage = (imageId: string) => {
    setImagesToDelete((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId],
    );
  };

  const form = useForm<z.infer<typeof step2Schema>>({
    resolver: mode === 'edit' ? undefined : zodResolver(step2Schema),
    mode: 'onChange',
    defaultValues: boatData
      ? {
          buildYear: String(boatData.buildYear),
          make: boatData.make,
          model: boatData.model,
          name: boatData.name,
          lengthFeet: String(boatData.boatDimensions.lengthFeet),
          lengthInches: String(boatData.boatDimensions.lengthInches),
          beamFeet: String(boatData.boatDimensions.beamFeet),
          beamInches: String(boatData.boatDimensions.beamInches),
          draftFeet: String(boatData.boatDimensions.draftFeet),
          draftInches: String(boatData.boatDimensions.draftInches),
          class: boatData.class,
          material: boatData.material,
          fuelType: boatData.fuelType,
          numEngines: String(boatData.enginesNumber),
          numCabins: String(boatData.cabinsNumber),
          numHeads: String(boatData.headsNumber),
          hours: boatData.engines[0]?.hours
            ? String(boatData.engines[0].hours)
            : '',
          make2: boatData.engines[0]?.make || '',
          model2: boatData.engines[0]?.model || '',
          totalPower: boatData.engines[0]?.horsepower
            ? String(boatData.engines[0].horsepower)
            : '',
          propellerType: boatData.engines[0]?.propellerType || '',
          engineFuelType: boatData.engines[0]?.fuelType || '',
          condition: boatData.condition,
          price: String(boatData.price),
          city: boatData.city,
          state: boatData.state,
          zip: boatData.zip,
          description: boatData.description || '',
          moreDetails: [],
          embedUrl: boatData.videoURL || '',
          coverPhoto: undefined,
          mediaGallery: [],
        }
      : {
          buildYear: '',
          make: '',
          model: '',
          name: '',
          lengthFeet: '',
          lengthInches: '',
          beamFeet: '',
          beamInches: '',
          draftFeet: '',
          draftInches: '',
          class: '',
          material: '',
          fuelType: '',
          numEngines: '',
          numCabins: '',
          numHeads: '',
          hours: '',
          make2: '',
          model2: '',
          totalPower: '',
          propellerType: '',
          engineFuelType: '',
          condition: '',
          price: '',
          city: '',
          state: '',
          zip: '',
          description: '',
          moreDetails: [],
          embedUrl: '',
          coverPhoto: undefined,
          mediaGallery: [],
        },
  });

  const { watch, getValues, trigger } = form;

  const watchedFields = watch([
    'buildYear',
    'make',
    'model',
    'name',
    'price',
    'condition',
    'lengthFeet',
    'lengthInches',
    'city',
    'state',
    'coverPhoto',
  ]);

  const handleSubmit = async () => {
    const fieldsToValidate =
      mode === 'edit'
        ? [
            'buildYear',
            'make',
            'model',
            'name',
            'lengthFeet',
            'lengthInches',
            'beamFeet',
            'beamInches',
            'draftFeet',
            'draftInches',
            'class',
            'material',
            'fuelType',
            'numEngines',
            'numCabins',
            'numHeads',
            'condition',
            'price',
            'city',
            'state',
            'zip',
            'description',
          ]
        : undefined;

    const isValid = fieldsToValidate
      ? await trigger(
          fieldsToValidate as Array<keyof z.infer<typeof step2Schema>>,
        )
      : await trigger();

    if (!isValid) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    const formValues = getValues();

    if (mode === 'create' && !formValues.coverPhoto) {
      toast.error('Please upload a cover photo');
      return;
    }

    setIsSubmitting(true);
    try {
      const formValues = getValues();
      const formData = new FormData();

      const boatInfo: Record<string, unknown> = {
        name: formValues.name,
        price: parseFloat(formValues.price),
        description: formValues.description,
        buildYear: parseInt(formValues.buildYear),
        make: formValues.make,
        model: formValues.model,
        fuelType: formValues.fuelType,
        boatClass: formValues.class,
        material: formValues.material,
        condition: formValues.condition,
        engineType: formValues.engineFuelType,
        propType: formValues.propellerType,
        propMaterial: boatData?.propMaterial || '',
        boatDimensions: {
          lengthFeet: parseInt(formValues.lengthFeet),
          lengthInches: parseInt(formValues.lengthInches),
          beamFeet: parseInt(formValues.beamFeet || ''),
          beamInches: parseInt(formValues.beamInches || ''),
          draftFeet: parseInt(formValues.draftFeet || ''),
          draftInches: parseInt(formValues.draftInches || ''),
        },
        enginesNumber: parseInt(formValues.numEngines),
        cabinsNumber: parseInt(formValues.numCabins || ''),
        headsNumber: parseInt(formValues.numHeads || ''),
        city: formValues.city,
        state: formValues.state,
        zip: formValues.zip,
        electronics: [],
        insideEquipment: [],
        outsideEquipment: [],
        electricalEquipment: [],
        coversEquipment: [],
        additionalEquipment: [],
        videoURL: formValues.embedUrl || '',
        engines: formValues.make2
          ? [
              {
                make: formValues.make2,
                model: formValues.model2,
                fuelType: formValues.engineFuelType,
                horsepower: parseInt(formValues.totalPower || '') || 0,
                hours: parseInt(formValues.hours || '') || 0,
                propellerType: formValues.propellerType,
              },
            ]
          : [],
        extraDetails: formValues.moreDetails || [],
      };

      if (mode === 'edit' && imagesToDelete.length > 0) {
        boatInfo.imagesToDelete = imagesToDelete;
      }

      formData.append('boatInfo', JSON.stringify(boatInfo));

      if (formValues.coverPhoto) {
        formData.append('covers', formValues.coverPhoto);
      }

      if (formValues.mediaGallery && formValues.mediaGallery.length > 0) {
        formValues.mediaGallery.forEach((file) => {
          formData.append('galleries', file);
        });
      }

      let response;
      if (mode === 'create') {
        response = await createBoatListing(formData);
      } else {
        response = await updateBoatListing(boatData!.id, formData);
      }

      if (response.success) {
        toast.success(
          mode === 'create'
            ? 'Boat listing created successfully!'
            : 'Boat listing updated successfully!',
        );
        router.push('/seller-dashboard/my-listing');
        router.refresh();
      } else {
        toast.error(response.message || 'Failed to save listing');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while saving the listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="my-2 md:my-3 mx-2 md:mx-5">
      <CustomContainer>
        <div className="rounded-lg bg-[#F4F4F4] p-3 sm:p-5 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleBack}
              aria-label="Go back"
              className="text-2xl sm:text-3xl cursor-pointer hover:scale-105 duration-500 transition-transform"
            >
              <ArrowLeft />
            </button>
            <h1 className="text-2xl sm:text-4xl font-bold">
              {mode === 'create' ? 'Create New Listing' : 'Edit Listing'}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className=" rounded-lg p-6">
                <FormProvider {...form}>
                  {mode === 'edit' && boatData ? (
                    <EditModeForm
                      boatData={boatData}
                      imagesToDelete={imagesToDelete}
                      onDeleteImage={handleDeleteImage}
                      fieldLimitations={fieldLimitations}
                    />
                  ) : (
                    <Step2Form fieldLimitations={fieldLimitations} />
                  )}
                </FormProvider>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting
                      ? 'Saving...'
                      : mode === 'create'
                        ? 'Create Listing'
                        : 'Update Listing'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="p-4 sticky top-4 bg-white rounded-xl">
                <h3 className="font-semibold mb-4">Preview</h3>
                <PreviewSection
                  buildYear={watchedFields[0]}
                  make={watchedFields[1]}
                  model={watchedFields[2]}
                  name={watchedFields[3]}
                  price={watchedFields[4]}
                  condition={watchedFields[5]}
                  lengthFeet={watchedFields[6]}
                  lengthInches={watchedFields[7]}
                  city={watchedFields[8]}
                  state={watchedFields[9]}
                  coverPhoto={watchedFields[10]}
                  boatPreviewFallback={
                    mode === 'edit' && boatData?.coverImages?.[0]?.url
                      ? boatData.coverImages[0].url
                      : ''
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
}
