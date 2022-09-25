class ColumnDecimalTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

/*
  For more information read: https://github.com/typeorm/typeorm/issues/873#issuecomment-424643086
  Issue is closed but still the behavior seems to be happening where decimals get returned as strings
*/
export default {precision: 10, scale: 2, default: 0, transformer: new ColumnDecimalTransformer()}
