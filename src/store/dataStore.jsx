import { create } from "zustand";

const useDataStore = create((set) => ({
  data: [],
  data2: [],
  setData: (data1) => set((state) => ({ data: data1 })),
  setData2: (data2) => set((state) => ({ data2: data2 })),
}));

export default useDataStore;
