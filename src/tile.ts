class Tile {
  pix = new Array(64)
  fbIndex: null | number = null
  tIndex: null | number = null;
  x: null | number = null;
  y: null | number = null;
  w: null | number = null;
  h: null | number = null;
  incX: null = null;
  incY: null = null;
  palIndex: null | number = null;
  tpri: null | number = null;
  c: null = null;
  initialized = false;
  opaque = new Array(8);

  setBuffer(scanline: number[]) {
    for (this.y = 0; this.y < 8; this.y++) {
      this.setScanline(this.y, scanline[this.y], scanline[this.y + 8]);
    }
  }

  setScanline(sline: number, b1: number, b2: number) {
    this.initialized = true;
    this.tIndex = sline << 3;
    for (this.x = 0; this.x < 8; this.x++) {
      this.pix[this.tIndex + this.x] =
        ((b1 >> (7 - this.x)) & 1) + (((b2 >> (7 - this.x)) & 1) << 1);
      if (this.pix[this.tIndex + this.x] === 0) {
        this.opaque[sline] = false;
      }
    }
  }

  render(buffer: number[], srcx1: number, srcy1: number, srcx2: number, srcy2: number, dx: number, dy: number, 
    palAdd: number, palette: number[], flipHorizontal: any, flipVertical: any, pri: number, priTable: number[]) {
    if (dx < -7 || dx >= 256 || dy < -7 || dy >= 240) {
      return;
    }

    this.w = srcx2 - srcx1;
    this.h = srcy2 - srcy1;

    if (dx < 0) {
      srcx1 -= dx;
    }
    if (dx + srcx2 >= 256) {
      srcx2 = 256 - dx;
    }

    if (dy < 0) {
      srcy1 -= dy;
    }
    if (dy + srcy2 >= 240) {
      srcy2 = 240 - dy;
    }

    if (!flipHorizontal && !flipVertical) {
      this.fbIndex = (dy << 8) + dx;
      this.tIndex = 0;
      for (this.y = 0; this.y < 8; this.y++) {
        for (this.x = 0; this.x < 8; this.x++) {
          if (
            this.x >= srcx1 &&
            this.x < srcx2 &&
            this.y >= srcy1 &&
            this.y < srcy2
          ) {
            this.palIndex = this.pix[this.tIndex];
            this.tpri = priTable[this.fbIndex];
            if (this.palIndex !== 0 && pri <= (this.tpri & 0xff)) {
              //console.log("Rendering upright tile to buffer");
              buffer[this.fbIndex] = palette[this.palIndex + palAdd];
              this.tpri = (this.tpri & 0xf00) | pri;
              priTable[this.fbIndex] = this.tpri;
            }
          }
          this.fbIndex++;
          this.tIndex++;
        }
        this.fbIndex -= 8;
        this.fbIndex += 256;
      }
    } else if (flipHorizontal && !flipVertical) {
      this.fbIndex = (dy << 8) + dx;
      this.tIndex = 7;
      for (this.y = 0; this.y < 8; this.y++) {
        for (this.x = 0; this.x < 8; this.x++) {
          if (
            this.x >= srcx1 &&
            this.x < srcx2 &&
            this.y >= srcy1 &&
            this.y < srcy2
          ) {
            this.palIndex = this.pix[this.tIndex];
            this.tpri = priTable[this.fbIndex];
            if (this.palIndex !== 0 && pri <= (this.tpri & 0xff)) {
              buffer[this.fbIndex] = palette[this.palIndex + palAdd];
              this.tpri = (this.tpri & 0xf00) | pri;
              priTable[this.fbIndex] = this.tpri;
            }
          }
          this.fbIndex++;
          this.tIndex--;
        }
        this.fbIndex -= 8;
        this.fbIndex += 256;
        this.tIndex += 16;
      }
    } else if (flipVertical && !flipHorizontal) {
      this.fbIndex = (dy << 8) + dx;
      this.tIndex = 56;
      for (this.y = 0; this.y < 8; this.y++) {
        for (this.x = 0; this.x < 8; this.x++) {
          if (
            this.x >= srcx1 &&
            this.x < srcx2 &&
            this.y >= srcy1 &&
            this.y < srcy2
          ) {
            this.palIndex = this.pix[this.tIndex];
            this.tpri = priTable[this.fbIndex];
            if (this.palIndex !== 0 && pri <= (this.tpri & 0xff)) {
              buffer[this.fbIndex] = palette[this.palIndex + palAdd];
              this.tpri = (this.tpri & 0xf00) | pri;
              priTable[this.fbIndex] = this.tpri;
            }
          }
          this.fbIndex++;
          this.tIndex++;
        }
        this.fbIndex -= 8;
        this.fbIndex += 256;
        this.tIndex -= 16;
      }
    } else {
      this.fbIndex = (dy << 8) + dx;
      this.tIndex = 63;
      for (this.y = 0; this.y < 8; this.y++) {
        for (this.x = 0; this.x < 8; this.x++) {
          if (
            this.x >= srcx1 &&
            this.x < srcx2 &&
            this.y >= srcy1 &&
            this.y < srcy2
          ) {
            this.palIndex = this.pix[this.tIndex];
            this.tpri = priTable[this.fbIndex];
            if (this.palIndex !== 0 && pri <= (this.tpri & 0xff)) {
              buffer[this.fbIndex] = palette[this.palIndex + palAdd];
              this.tpri = (this.tpri & 0xf00) | pri;
              priTable[this.fbIndex] = this.tpri;
            }
          }
          this.fbIndex++;
          this.tIndex--;
        }
        this.fbIndex -= 8;
        this.fbIndex += 256;
      }
    }
  }

  isTransparent(x: number, y: number) {
    return this.pix[(y << 3) + x] === 0
  }

  toJSON() {
    return {
      opaque: this.opaque,
      pix: this.pix,
    }
  }

  fromJSON(s: S) {
    this.opaque = s.opaque;
    this.pix = s.pix;
  }

}

interface S {
  opaque: any[];
  pix: any[]
}

export default Tile