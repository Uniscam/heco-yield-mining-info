import MulticallABI from "./Multicall.json";
import LunarModuleABI from "./LunarModule.json";
import { utils } from "ethers";

export const IMulticall = new utils.Interface(MulticallABI);
export const ILunarModule = new utils.Interface(LunarModuleABI);
