'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export function MoreDetailsSection() {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'moreDetails',
  });

  return (
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
  );
}
