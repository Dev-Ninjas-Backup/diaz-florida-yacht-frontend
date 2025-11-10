'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { DimensionInput } from '../FormFields/DimensionInput';
import { FormInput } from '../FormFields/FormInput';
import { FormSelect } from '../FormFields/FormSelect';
import { FormTextarea } from '../FormFields/FormTextarea';
import { CoverPhotoUpload } from '../MediaUpload/CoverPhotoUpload';
import { GalleryUpload } from '../MediaUpload/GalleryUpload';
import { buildYearOptions, classOptions, conditionOptions, fuelTypeOptions, makeModelOptions, materialOptions, propellerTypeOptions, stateOptions } from '@/lib/utils/register-boats-select-options';

const Step2Form = () => {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'moreDetails',
  });



  return (
    <div className="mt-10">
      {/* Specifications */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Specifications</h3>

        {/* Build Year -- Make -- Model */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect
            name="buildYear"
            label="Build Year"
            options={buildYearOptions}
            placeholder="Select"
            required
          />
          <FormSelect
            name="make"
            label="Make"
            options={makeModelOptions}
            placeholder="Select"
            required
          />
          <FormSelect
            name="model"
            label="Model"
            options={makeModelOptions}
            placeholder="Select"
            required
          />
        </div>

        {/* Dimensions: Length -- Beam -- Draft */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <DimensionInput namePrefix="length" label="Length" required />
          <DimensionInput namePrefix="beam" label="Beam Size" required />
          <DimensionInput namePrefix="draft" label="Max Draft" required />
        </div>

        {/* Class -- Material -- Fuel Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <FormSelect
            name="class"
            label="Class"
            options={classOptions}
            placeholder="Select"
            required
          />
          <FormSelect
            name="material"
            label="Material"
            options={materialOptions}
            placeholder="Select"
            required
          />
          <FormSelect
            name="fuelType"
            label="Fuel Type"
            options={fuelTypeOptions}
            placeholder="Select"
            required
          />
        </div>

        {/* Number of Engines -- Cabins -- Heads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <FormInput
            name="numEngines"
            label="Number of Engines"
            placeholder="Type here"
            type="number"
            required
          />
          <FormInput
            name="numCabins"
            label="Number of Cabins"
            placeholder="Type here"
            type="number"
            required
          />
          <FormInput
            name="numHeads"
            label="Number of Heads"
            placeholder="Type here"
            type="number"
            required
          />
        </div>
      </div>

      {/* Engine 1 */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Engine 1</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            name="hours"
            label="Hours"
            placeholder="Type here"
            type="number"
            required
          />
          <FormInput
            name="make2"
            label="Make"
            placeholder="Type here"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <FormInput
            name="model2"
            label="Model"
            placeholder="Type here"
            required
          />
          <FormInput
            name="totalPower"
            label="Total Power (HP)"
            placeholder="Type here"
            type="number"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <FormSelect
            name="engineFuelType"
            label="Fuel Type"
            options={fuelTypeOptions}
            placeholder="Select"
            required
          />
          <FormSelect
            name="propellerType"
            label="Propeller Type"
            options={propellerTypeOptions}
            placeholder="Select"
            required
          />
        </div>
      </div>

      {/* Basic Information */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            name="condition"
            label="Condition"
            options={conditionOptions}
            placeholder="Select"
            required
          />
          <FormInput
            name="price"
            label="Price"
            placeholder="Type here"
            type="number"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormInput
            name="city"
            label="City"
            placeholder="Type here"
            required
          />
          <FormSelect
            name="state"
            label="State"
            options={stateOptions}
            placeholder="Select"
            required
          />
          <FormInput name="zip" label="Zip" placeholder="Type here" required />
        </div>

        <div className="mt-4">
          <FormInput
            name="name"
            label="Name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="mt-4">
          <FormTextarea
            name="description"
            label="Description"
            placeholder="Write description..."
            rows={4}
            required
          />
        </div>
      </div>

      {/* More Details */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">More Details (Optional)</h3>

        {fields.length === 0 ? (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                placeholder="Enter Title"
                disabled
                className="w-full bg-white rounded-[12px] border-none shadow-none"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Write description..."
                disabled
                className="w-full bg-white rounded-[12px] border-none shadow-none"
              />
            </div>
          </div>
        ) : (
          fields.map((field, index) => (
            <div key={field.id} className="space-y-4 mb-4 pb-4 border-b">
              <div>
                <Label>Title</Label>
                <Input
                  placeholder="Enter Title"
                  className="w-full bg-white rounded-[12px] border-none shadow-none"
                  {...register(`moreDetails.${index}.title`)}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Write description..."
                  className="w-full bg-white rounded-[12px] border-none shadow-none h-32"
                  {...register(`moreDetails.${index}.description`)}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          ))
        )}

        <Button
          type="button"
          onClick={() => append({ title: '', description: '' })}
          className="bg-blue-500 hover:bg-blue-600 text-white mt-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Description
        </Button>
      </div>

      {/* Media & Gallery */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Media & Gallery</h3>
        <p className="text-sm text-gray-600 mb-4">
          Your package allows 25 images.
        </p>

        <div className="mb-6">
          <FormInput
            name="embedUrl"
            label="Enter Embed URL (YouTube or Vimeo)"
            placeholder="https://youtube.com/embed/..."
          />
        </div>

        <div className="mb-6">
          <CoverPhotoUpload
            name="coverPhoto"
            label="Upload Cover Photo"
            required
          />
        </div>

        <div>
          <GalleryUpload
            name="mediaGallery"
            label="Upload Media Gallery"
            maxFiles={25}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2Form;
