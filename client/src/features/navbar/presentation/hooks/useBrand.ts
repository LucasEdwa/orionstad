import { BrandService } from "../../application/BrandService";

export const useBrand = () => {
  const brandService = new BrandService();
  
  return {
    brandInfo: brandService.getBrandInfo(),
  };
};
