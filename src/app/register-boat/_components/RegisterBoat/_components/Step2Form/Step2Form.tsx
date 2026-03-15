'use client';
import { buildYearOptions } from '@/lib/utils/register-boats-select-options';
import { FieldLimitations } from '@/types/subscription-types';
import { useFormContext } from 'react-hook-form';
import { Trash2 } from 'lucide-react';
import { DimensionInput } from '../FormFields/DimensionInput';
import { DynamicFormSelect } from '../FormFields/DynamicFormSelect';
import { FormInput } from '../FormFields/FormInput';
import { FormSelect } from '../FormFields/FormSelect';
import { FormTextarea } from '../FormFields/FormTextarea';
import { CityField } from './CityField';
import { MediaGallerySection } from './MediaGallerySection';
import { MoreDetailsSection } from './MoreDetailsSection';
import { StateField } from './StateField';

const engineCountOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
];

interface Step2FormProps {
  fieldLimitations: FieldLimitations;
}

const Step2Form = ({ fieldLimitations }: Step2FormProps) => {
  const { watch, setValue, getValues } = useFormContext();
  const numEngines = watch('numEngines');
  const engineCount = parseInt(numEngines) || 1;

  const handleDeleteEngine = (indexToDelete: number) => {
    const currentEngines = getValues('engines') || [];
    const newEngines = currentEngines.filter(
      (_: unknown, index: number) => index !== indexToDelete,
    );

    setValue('engines', newEngines);
    setValue('numEngines', String(newEngines.length));
  };

  return (
    <div className="mt-10">
      <div>
        <h3 className="text-lg font-semibold mb-4">Specifications</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect
            name="buildYear"
            label="Build Year"
            options={buildYearOptions}
            placeholder="Select"
            required
          />
          <DynamicFormSelect
            name="make"
            label="Make"
            type="MAKE"
            placeholder="Select or type"
            required
          />
          <FormInput
            name="model"
            label="Model"
            placeholder="Type here"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <DimensionInput namePrefix="length" label="Length" required />
          <DimensionInput namePrefix="beam" label="Beam Size" />
          <DimensionInput namePrefix="draft" label="Max Draft" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <DynamicFormSelect
            name="class"
            label="Class"
            type="CLASS"
            placeholder="Select or type"
            required
          />
          <DynamicFormSelect
            name="material"
            label="Material"
            type="MATERIAL"
            placeholder="Select or type"
          />
          <DynamicFormSelect
            name="fuelType"
            label="Fuel Type"
            type="FUEL_TYPE"
            placeholder="Select or type"
            required
          />
          <DynamicFormSelect
            name="propMaterial"
            label="Propeller Material"
            type="PROP_MATERIAL"
            placeholder="Select or type"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <FormSelect
            name="numEngines"
            label="Number of Engines"
            options={engineCountOptions}
            placeholder="Select"
            required
          />
          <FormInput
            name="numCabins"
            label="Number of Cabins"
            placeholder="Type here"
            type="number"
          />
          <FormInput
            name="numHeads"
            label="Number of Heads"
            placeholder="Type here"
            type="number"
          />
        </div>
      </div>

      {Array.from({ length: engineCount }, (_, index) => (
        <div key={index + 1} className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Engine {index + 1}</h3>
            {engineCount > 1 && (
              <button
                type="button"
                onClick={() => handleDeleteEngine(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Engine"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              name={`engines.${index}.hours`}
              label="Hours"
              placeholder="Type here"
              type="number"
            />
            <FormInput
              name={`engines.${index}.make`}
              label="Make"
              placeholder="Type here"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name={`engines.${index}.model`}
              label="Model"
              placeholder="Type here"
            />
            <FormInput
              name={`engines.${index}.totalPower`}
              label="Total Power (HP)"
              placeholder="Type here"
              type="number"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <DynamicFormSelect
              name={`engines.${index}.engineFuelType`}
              label="Engine Type"
              type="ENGINE_TYPE"
              placeholder="Select or type"
            />
            <DynamicFormSelect
              name={`engines.${index}.propellerType`}
              label="Propeller Type"
              type="PROP_TYPE"
              placeholder="Select or type"
            />
          </div>
        </div>
      ))}

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DynamicFormSelect
            name="condition"
            label="Condition"
            type="CONDITION"
            placeholder="Select or type"
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
          <StateField />

          <CityField />

          <FormInput name="zip" label="Zip" placeholder="Type here" required />
        </div>

        <div className="mt-4">
          <FormInput
            name="name"
            label="Boat Name"
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
            maxWords={fieldLimitations.wordLimit}
          />
        </div>
      </div>

      <MoreDetailsSection />

      <MediaGallerySection fieldLimitations={fieldLimitations} />
    </div>
  );
};

export default Step2Form;
