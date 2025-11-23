'use client';
import { buildYearOptions } from '@/lib/utils/register-boats-select-options';
import { DimensionInput } from '../FormFields/DimensionInput';
import { DynamicFormSelect } from '../FormFields/DynamicFormSelect';
import { FormInput } from '../FormFields/FormInput';
import { FormSelect } from '../FormFields/FormSelect';
import { FormTextarea } from '../FormFields/FormTextarea';
import { CityField } from './CityField';
import { MediaGallerySection } from './MediaGallerySection';
import { MoreDetailsSection } from './MoreDetailsSection';
import { StateField } from './StateField';

const Step2Form = () => {
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
          <DynamicFormSelect
            name="make"
            label="Make"
            type="MAKE"
            placeholder="Select or type"
            required
          />
          <DynamicFormSelect
            name="model"
            label="Model"
            type="MODEL"
            placeholder="Select or type"
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
            required
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
          <DynamicFormSelect
            name="engineFuelType"
            label="Engine Type"
            type="ENGINE_TYPE"
            placeholder="Select or type"
            required
          />
          <DynamicFormSelect
            name="propellerType"
            label="Propeller Type"
            type="PROP_TYPE"
            placeholder="Select or type"
            required
          />
        </div>
      </div>

      {/* Basic Information */}
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
          {/* State - dynamic options with custom input fallback */}
          <StateField />

          {/* City - dynamic options based on selected state, with custom input fallback */}
          <CityField />

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
      <MoreDetailsSection />

      {/* Media & Gallery */}
      <MediaGallerySection />
    </div>
  );
};

export default Step2Form;
