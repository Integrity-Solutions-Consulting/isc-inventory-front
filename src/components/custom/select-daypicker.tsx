import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import DateRangePicker from '@/components/ui/dateRangePicker';

const selectOptions = {
  placeHolder: 'Select period',
  items: [
    {
      label: 'today',
      value: 'day',
    },
    {
      label: 'custom',
      value: 'custom',
    },
  ],
};

type UseSelectDatePickerValue = 'day' | 'week' | 'month' | 'year' | 'custom';

interface UseSelectDatePickerState {
  selectValue: UseSelectDatePickerValue;

  // ✅ Métodos
  setSelectValue: (value: UseSelectDatePickerValue) => void;
}

const useSelectDatePickerStore = create<UseSelectDatePickerState>()(
  devtools((set) => ({
    selectValue: 'day',
    setSelectValue: (value) => set({ selectValue: value }),
  })),
);

const SelectDatePicker = () => {
  const { selectValue, setSelectValue } = useSelectDatePickerStore();

  return (
    <div>
      {selectValue === 'custom' ? (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectValue('day')}>
            <ChevronLeft />
          </Button>
          <DateRangePicker onChange={(e) => console.log(e)} />
        </div>
      ) : (
        <Select value={selectValue} onValueChange={setSelectValue}>
          <SelectTrigger className="w-[180px] capitalize">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            {selectOptions.items.map((item) => (
              <SelectItem
                className="capitalize"
                key={item.value}
                value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export { SelectDatePicker };
