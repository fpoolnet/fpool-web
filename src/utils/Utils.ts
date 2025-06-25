import { address, networks } from 'flokicoinjs-lib';
import CustomError from '@objects/CustomError';

export const setWidthStyle = (width?: any) => {
  if (width && typeof width === 'number') {
    return { width: `${width}px !important` };
  }
  if (width && typeof width === 'string') {
    return { width: `${width} !important` };
  }
  return {};
};

export const isMobileDevice = (): boolean => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  return (
    /Android/i.test(userAgent) ||
    /webOS/i.test(userAgent) ||
    /iPhone/i.test(userAgent) ||
    /iPad/i.test(userAgent) ||
    /iPod/i.test(userAgent) ||
    /BlackBerry/i.test(userAgent) ||
    /IEMobile/i.test(userAgent) ||
    /Opera Mini/i.test(userAgent)
  );
};

export const hexStringToUint8Array = (hexString: string): Uint8Array => {
  if (hexString.length !== 64) {
    throw new Error('Invalid hex string length. Should be 64 characters (32 bytes).');
  }
  const array = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    array[i / 2] = parseInt(hexString.substr(i, 2), 16);
  }
  return array;
};

export const validateAddress = (addr: string) => {
  try {
    return address.toOutputScript(addr, networks.regtest);
  } catch (err) {
    throw new CustomError(err);
  }
};

export const getTimeBeforeDaysInSeconds = (days: number): number =>
  Math.ceil(Date.now() / 1000) - days * 24 * 60 * 60;
