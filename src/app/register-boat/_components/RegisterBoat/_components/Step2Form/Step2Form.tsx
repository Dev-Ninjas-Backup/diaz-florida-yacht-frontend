/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, X } from "lucide-react";
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const Step2Form = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    control,
    clearErrors,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "moreDetails",
  });

  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(
    null
  );
  const [mediaGalleryPreviews, setMediaGalleryPreviews] = useState<string[]>(
    []
  );

  const buildYear = watch("buildYear");
  const make = watch("make");
  const model = watch("model");
  const classValue = watch("class");
  const material = watch("material");
  const fuelType = watch("fuelType");
  const propellerType = watch("propellerType");
  const condition = watch("condition");
  const stateValue = watch("state");
  const mediaGallery = watch("mediaGallery") || [];

  // useEffect(() => {
  //   if (coverPhoto && !coverPhotoPreview) {
  //     setCoverPhotoPreview(coverPhoto);
  //   }
  // }, [coverPhoto, coverPhotoPreview]);

  // useEffect(() => {
  //   if (mediaGallery.length > 0 && mediaGalleryPreviews.length === 0) {
  //     setMediaGalleryPreviews(mediaGallery);
  //   }
  // }, [mediaGallery, mediaGalleryPreviews.length]);

  // const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const result = reader.result as string;
  //       setCoverPhotoPreview(result);
  //       setValue("coverPhoto", result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleMediaGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     const newPreviews = [...mediaGalleryPreviews];
  //     const newGallery = [...mediaGallery];

  //     Array.from(files).forEach((file) => {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         const result = reader.result as string;
  //         newPreviews.push(result);
  //         newGallery.push(result);
  //         setMediaGalleryPreviews(newPreviews);
  //         setValue("mediaGallery", newGallery);
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //   }
  // };

  // const removeMediaImage = (index: number) => {
  //   const newPreviews = mediaGalleryPreviews.filter((_, i) => i !== index);
  //   const newGallery = mediaGallery.filter(
  //     (_: string, i: number) => i !== index
  //   );
  //   setMediaGalleryPreviews(newPreviews);
  //   setValue("mediaGallery", newGallery);
  // };

  // const removeCoverPhoto = () => {
  //   setCoverPhotoPreview(null);
  //   setValue("coverPhoto", "");
  // };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPhotoPreview(URL.createObjectURL(file)); // preview
      setValue("coverPhoto", file); // store File object
    }
  };

  const handleMediaGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (mediaGallery.length + files.length > 25) {
      alert("You can only upload up to 25 images.");
      return;
    }

    const newPreviews = [...mediaGalleryPreviews];
    const newGallery = [...mediaGallery];

    Array.from(files).forEach((file) => {
      newPreviews.push(URL.createObjectURL(file));
      newGallery.push(file);
    });

    setMediaGalleryPreviews(newPreviews);
    setValue("mediaGallery", newGallery);
  };

  const removeCoverPhoto = () => {
    setCoverPhotoPreview(null);
    setValue("coverPhoto", undefined);
  };

  const removeMediaImage = (index: number) => {
    const newPreviews = mediaGalleryPreviews.filter((_, i) => i !== index);
    const newGallery = mediaGallery.filter((_: any, i: number) => i !== index);
    setMediaGalleryPreviews(newPreviews);
    setValue("mediaGallery", newGallery);
  };
  const handleSelectChange = (fieldName: string, value: string) => {
    setValue(fieldName, value);
    clearErrors(fieldName);
  };
  return (
    <div className="mt-10">
      {/* Specifications */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Specifications</h3>
        {/* Build -- Make -- Model  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Build  */}
          <div>
            <Label htmlFor="buildYear">Build Year *</Label>
            <Select
              value={buildYear || ""}
              onValueChange={(value) => handleSelectChange("buildYear", value)}
            >
              <SelectTrigger
                className={`w-full bg-white rounded-[12px] border-none shadow-none`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
            {errors.buildYear && (
              <p className="text-red-500 text-sm mt-1">
                {errors.buildYear.message as string}
              </p>
            )}
          </div>
          {/* Make  */}
          <div>
            <Label htmlFor="make">Make *</Label>
            <Select
              value={make || ""}
              onValueChange={(value) => handleSelectChange("make", value)}
            >
              <SelectTrigger
                className={`w-full bg-white rounded-[12px] border-none shadow-none ${
                  errors.make ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">a</SelectItem>
                <SelectItem value="2022">b</SelectItem>
                <SelectItem value="2021">c</SelectItem>
              </SelectContent>
            </Select>
            {errors.make && (
              <p className="text-red-500 text-sm mt-1">
                {errors.make.message as string}
              </p>
            )}
          </div>
          {/* Model  */}
          <div>
            <Label htmlFor="model">Model *</Label>
            <Select
              value={model || ""}
              onValueChange={(value) => handleSelectChange("model", value)}
            >
              <SelectTrigger
                className={`w-full bg-white rounded-[12px] border-none shadow-none`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">a</SelectItem>
                <SelectItem value="2022">b</SelectItem>
                <SelectItem value="2021">c</SelectItem>
              </SelectContent>
            </Select>
            {errors.model && (
              <p className="text-red-500 text-sm mt-1">
                {errors.model.message as string}
              </p>
            )}
          </div>
        </div>
        {/* Length -- Beam -- Max Draft  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {/* Length  */}
          <div>
            <Label htmlFor="length">Length (Ft) *</Label>
            <Input
              id="length"
              placeholder="Type here"
              {...register("length")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.length && (
              <p className="text-red-500 text-sm mt-1">
                {errors.length.message as string}
              </p>
            )}
          </div>
          {/* Beam Size  */}
          <div>
            <Label htmlFor="beam">Beam Size(Ft) *</Label>
            <Input
              id="beam"
              placeholder="Type here"
              {...register("beam")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.beam && (
              <p className="text-red-500 text-sm mt-1">
                {errors.beam.message as string}
              </p>
            )}
          </div>
          {/* max Draft  */}
          <div>
            <Label htmlFor="maxDraft">Max Draft(Ft) *</Label>
            <Input
              id="maxDraft"
              placeholder="Type here"
              {...register("maxDraft")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.maxDraft && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxDraft.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Class -- Material -- Fuel type  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {/* Class  */}
          <div>
            <Label htmlFor="class">Class *</Label>
            <Select
              value={classValue || ""}
              onValueChange={(value) => handleSelectChange("class", value)}
            >
              <SelectTrigger
                className={`w-full bg-white rounded-[12px] border-none shadow-none`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cabin">Cabin</SelectItem>
                <SelectItem value="open">Open</SelectItem>
              </SelectContent>
            </Select>
            {errors.class && (
              <p className="text-red-500 text-sm mt-1">
                {errors.class.message as string}
              </p>
            )}
          </div>
          {/* Material  */}
          <div>
            <Label htmlFor="material">Material *</Label>
            <Select
              value={material || ""}
              onValueChange={(value) => handleSelectChange("material", value)}
            >
              <SelectTrigger
                className={`w-full bg-white rounded-[12px] border-none shadow-none`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fiberglass">Fiberglass</SelectItem>
                <SelectItem value="aluminum">Aluminum</SelectItem>
              </SelectContent>
            </Select>
            {errors.material && (
              <p className="text-red-500 text-sm mt-1">
                {errors.material.message as string}
              </p>
            )}
          </div>
          {/* Fuel Type  */}
          <div>
            <Label htmlFor="fuelType">Fuel Type *</Label>
            <Select
              value={fuelType || ""}
              onValueChange={(value) => handleSelectChange("fuelType", value)}
            >
              <SelectTrigger
                className={`w-full bg-white rounded-[12px] border-none shadow-none`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gas">Gas</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
              </SelectContent>
            </Select>
            {errors.fuelType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fuelType.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Engine -- Cabin -- Head  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {/* Engine  */}
          <div>
            <Label htmlFor="numEngines">Number of Engines *</Label>
            <Input
              id="numEngines"
              placeholder="Type here"
              {...register("numEngines")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.numEngines && (
              <p className="text-red-500 text-sm mt-1">
                {errors.numEngines.message as string}
              </p>
            )}
          </div>

          {/* Cabin  */}
          <div>
            <Label htmlFor="numCabins">Number of Cabins *</Label>
            <Input
              id="numCabins"
              placeholder="Type here"
              {...register("numCabins")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.numCabins && (
              <p className="text-red-500 text-sm mt-1">
                {errors.numCabins.message as string}
              </p>
            )}
          </div>

          {/* Head  */}
          <div>
            <Label htmlFor="numHeads">Number of Heads *</Label>
            <Input
              id="numHeads"
              placeholder="Type here"
              {...register("numHeads")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.numHeads && (
              <p className="text-red-500 text-sm mt-1">
                {errors.numHeads.message as string}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Engine 1 */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Engine 1</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hours">Hours *</Label>
            <Input
              id="hours"
              placeholder="Type here"
              {...register("hours")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.hours && (
              <p className="text-red-500 text-sm mt-1">
                {errors.hours.message as string}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="make2">Make *</Label>
            <Input
              id="make2"
              placeholder="Type here"
              {...register("make2")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.make2 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.make2.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="model2">Model *</Label>
            <Input
              id="model2"
              placeholder="Type here"
              {...register("model2")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.model2 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.model2.message as string}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="totalPower">Total Power (HP) *</Label>
            <Input
              id="totalPower"
              placeholder="Type here"
              {...register("totalPower")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.totalPower && (
              <p className="text-red-500 text-sm mt-1">
                {errors.totalPower.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="mt-4">
            <Label htmlFor="propellerType">Fuel Type *</Label>
            <Select
              value={propellerType || ""}
              onValueChange={(value) =>
                handleSelectChange("propellerType", value)
              }
            >
              <SelectTrigger
                className={`w-full bg-white rounded-[12px] border-none shadow-none`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="variable">Variable</SelectItem>
              </SelectContent>
            </Select>
            {errors.propellerType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.propellerType.message as string}
              </p>
            )}
          </div>
          <div className="mt-4">
            <Label htmlFor="propellerType">Propeller Type *</Label>
            <Select
              value={propellerType || ""}
              onValueChange={(value) =>
                handleSelectChange("propellerType", value)
              }
            >
              <SelectTrigger
                className={`w-full bg-white rounded-[12px] border-none shadow-none`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="variable">Variable</SelectItem>
              </SelectContent>
            </Select>
            {errors.propellerType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.propellerType.message as string}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* condition  */}
          <div>
            <Label htmlFor="condition">Condition *</Label>
            <Select
              value={condition || ""}
              onValueChange={(value) => handleSelectChange("condition", value)}
            >
              <SelectTrigger
                className={`w-full bg-white rounded-[12px] border-none shadow-none`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
              </SelectContent>
            </Select>
            {errors.condition && (
              <p className="text-red-500 text-sm mt-1">
                {errors.condition.message as string}
              </p>
            )}
          </div>
          {/* price  */}
          <div>
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              placeholder="Type here"
              {...register("price")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* city  */}
          <div>
            <Label htmlFor="city2">City *</Label>
            <Input
              id="city2"
              placeholder="Type here"
              {...register("city")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.city.message as string}
              </p>
            )}
          </div>
          {/* state  */}
          <div>
            <Label htmlFor="state2">State *</Label>
            <Select
              value={stateValue || ""}
              onValueChange={(value) => handleSelectChange("state", value)}
            >
              <SelectTrigger
                className={`w-full bg-white rounded-[12px] border-none shadow-none`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="ny">New York</SelectItem>
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message as string}
              </p>
            )}
          </div>
          {/* zip  */}
          <div>
            <Label htmlFor="zip2">Zip *</Label>
            <Input
              id="zip2"
              placeholder="Type here"
              {...register("zip")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.zip && (
              <p className="text-red-500 text-sm mt-1">
                {errors.zip.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Name  */}
        <div className="mt-4">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            placeholder="Type here"
            {...register("name")}
            className={`w-full bg-white rounded-[12px] border-none shadow-none`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message as string}
            </p>
          )}
        </div>

        {/* Description  */}
        <div className="mt-4">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Write description..."
            {...register("description")}
            className={`w-full bg-white rounded-[12px] border-none shadow-none h-32`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message as string}
            </p>
          )}
        </div>
      </div>

      {/* More Details  */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">More Details (Optional)</h3>

        {fields.length === 0 ? (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                placeholder="Enter Title"
                disabled
                className={`w-full bg-white rounded-[12px] border-none shadow-none`}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Write description..."
                disabled
                className={`w-full bg-white rounded-[12px] border-none shadow-none`}
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
                  className={`w-full bg-white rounded-[12px] border-none shadow-none`}
                  {...register(`moreDetails.${index}.title`)}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Write description..."
                  className={`w-full bg-white rounded-[12px] border-none shadow-none h-32`}
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
          onClick={() => append({ title: "", description: "" })}
          className="bg-blue-500 hover:bg-blue-600 text-white mt-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Description
        </Button>
      </div>

      {/* Media And Gallery  */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Media & Gallery</h3>
        <p className="text-sm text-gray-600 mb-4">
          Your package allows 25 images.
        </p>

        <div className="mb-4">
          <Label htmlFor="embedUrl">Enter Embed URL (YouTube or Vimeo):</Label>
          <Input
            id="embedUrl"
            placeholder="https://youtube.com/embed/..."
            className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            {...register("embedUrl")}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Upload Cover Photo</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 relative">
          {coverPhotoPreview ? (
            <div className="relative">
              <img
                src={coverPhotoPreview || "/placeholder.svg"}
                alt="Cover preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeCoverPhoto}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer">
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-600">Click to upload or drag & drop</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverPhotoChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold mb-2">Upload Media Gallery</h3>
        <div className="grid grid-cols-3 gap-4">
          {mediaGalleryPreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview || "/placeholder.svg"}
                alt={`Gallery ${index}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeMediaImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors flex flex-col items-center justify-center">
            <Plus className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Add Photo</p>
            {mediaGalleryPreviews.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                See All {mediaGalleryPreviews.length} photos
              </p>
            )}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleMediaGalleryChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step2Form;
