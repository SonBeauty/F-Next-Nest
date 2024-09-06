import * as bcrypt from 'bcryptjs';

const SALTROUNDS = 10;

export const hashPassword = async (plainPassword: string) => {
  try {
    return await bcrypt.hash(plainPassword, SALTROUNDS);
  } catch (error) {
    console.log(error);
  }
};

export const comparePasswordHelper = async (
  plainPassword: string,
  hashPassword: string,
) => {
  try {
    return await bcrypt.compare(plainPassword, hashPassword);
  } catch (error) {
    console.log(error);
  }
};
