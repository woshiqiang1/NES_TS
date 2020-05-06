const copyArrayElements = (src: number[], srcPos: number, dest: number[], destPos: number, length: number) => {
  for (let i = 0; i < length; ++i) {
    dest[destPos + i] = src[srcPos + i];
  }
}

const copyArray = (src: number[]) => {
  return src.slice(0)
}

export interface OBJ {
  JSON_PROPERTIES?: string[];
  [propName: string]: any;
}

const fromJSON = (obj: OBJ, state: OBJ) => {
  for (let i = 0; i < obj.JSON_PROPERTIES.length; i++) {
    obj[obj.JSON_PROPERTIES[i]] = state[obj.JSON_PROPERTIES[i]];
  }
}

const toJSON = (obj: OBJ) => {
  let state: OBJ = {};
    for (let i = 0; i < obj.JSON_PROPERTIES.length; i++) {
      state[obj.JSON_PROPERTIES[i]] = obj[obj.JSON_PROPERTIES[i]];
    }
    return state;
}

export { copyArrayElements, copyArray, fromJSON, toJSON }