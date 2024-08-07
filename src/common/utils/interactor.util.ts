import * as R from "ramda";

/**
 * Kiểm tra giá trị không rỗng
 * @param {any} value - value kiểm tra.
 * @returns {boolean} Return false nếu value truyền vào là {}, [], undefined, null hoặc ""
 */
export const isNotEmpty = (value: any) => {
  return !R.isEmpty(value) && !R.isNil(value);
};

/**
 * Kiểm tra giá trị không rỗng của 1 object
 * @param {string[]} path - đường dẫn đến field kiểm tra.
 * @param {object} obj - object cần kiểm tra.
 * @returns {boolean} Return false nếu bất kì field nào là {}, [], undefined, null hoặc ""
 */
export const isNotEmptyWithPath = (path, obj) => {
  const propValue = R.path(path, obj);
  return (
    propValue !== null &&
    propValue !== undefined &&
    !R.isEmpty(propValue) &&
    !R.isEmpty(R.filter(R.isEmpty, propValue))
  );
};

/**
 * Xoá phần tử có giá trị trùng nhau ở field nào đó
 * @param {any[]} array - mảng cần lọc.
 * @param {string} field - Field cần kiểm tra.
 * @returns {any[]} Return mảng đã lọc.
 */
export const clearDuplicateInArrayWithFieldName = (
  array: any,
  field: string
): any[] => {
  if (isNotEmpty(array)) {
    return R.uniqWith(R.eqBy(R.prop(field)), array);
  }

  return [];
};

/**
 * Xoá phần tử có giá trị trùng nhau ở field nào đó
 * @param {any[]} array - mảng cần lọc.
 * @param {string[]} fields - đường dẫn đến field cần kiểm tra dưới dạng mảng.
 * @returns {any[]} Return mảng đã lọc.
 */

export const clearDuplicateInArrayWithPathnames = (
  arr: any[],
  fields: string[]
): any[] => {
  const uniqueMap: Map<string, any[]> = new Map();

  arr.forEach((obj) => {
    const key = fields.map((field) => obj[field]).join("-"); // Tạo key từ các trường được chỉ định
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, obj);
    }
  });

  return Array.from(uniqueMap.values());
};

/**
 * Tạo ra object lồng nhau theo path đã truyền vào với giá trị stringValue[0]
 * @param {string[]} path - path của object.
 * @param {string[]} stringValue - mảng giá trị.
 * @returns {object} Object sau khi lồng, nếu stringValue rỗng sẽ return undefined.
 */
export const assocPathStatus = (path: string[], stringValue: string[]) => {
  const init = {};
  init[path[0]] = undefined;
  if (isNotEmpty(stringValue)) return R.assocPath(path, stringValue[0], init);

  return undefined;
};

/**
 * Trả về mảng có giá trị hoặc []
 * @param {any} obj - object chứa phần tử mảng.
 * @param {string} fieldName - tên phần tử trả về.
 * @returns {any[]} Trả về mảng phần tử có tên truyền vào hoặc []
 */
export const handleReturnArray = (obj: any, fieldName: string) => {
  return R.pathOr([], [fieldName], obj);
};

/**
 * Cắt phần tử không mong muốn ra khỏi chuỗi
 * @param {string} str - Chuỗi cần cắt.
 * @param {string} removeStr - Phần tử muốn bỏ.
 * @returns {string} Trả về chuỗi đã loại bỏ phần tử yêu cầu
 */
export const sliceString = (str: string, removeStr: string) => {
  return R.join("", R.reject(R.equals(removeStr), R.split(removeStr, str)));
};

/**
 * Sắp xếp mảng dựa vào bằng field nào đó
 * @param {string[]} fieldPath - Đường dẫn của field.
 * @param {any[]} array - Mảng.
 * @returns {any[]} Trả về mảng đã sắp xếp
 */
export const sortArrayByFieldPath = (fieldPath: string[], array: any[]) => {
  // Tạo hàm so sánh dựa trên giá trị của trường được chỉ định
  const comparator = R.comparator((a: any, b: any) => {
    const valueA = R.path(fieldPath, a); // Lấy giá trị của trường từ đối tượng a
    const valueB = R.path(fieldPath, b); // Lấy giá trị của trường từ đối tượng b
    return valueA < valueB;
  });

  // Sắp xếp mảng dựa trên comparator
  return R.sort(comparator, array);
};

/**
 * Xoá phần tử trong mảng với điều kiện
 * @param {any[]} array - Mảng
 * @param {any} condition - điều kiện.
 * @returns {any[]} Trả về mảng đã xoá theo điều kiện
 */
export const removeItemInArrayWithCondition = (array: any[], condion: any) => {
  return R.reject(condion, array);
};
