/**
 * @Description
 * Information based on The United States Environmental Protection Agency (EPA)
 * https://en.wikipedia.org/wiki/Air_quality_index
 * 
 * Measured value
 * i: The (Air Quality) index,
 * c: The pollutant concentration,
 * c_low: The  concentration breakpoint that is less than (c),
 * c_high: The  concentration breakpoint that is more than (c),
 * i_low: The  index breakpoint corresponding to (c_low),
 * i_hight: The  index breakpoint corresponding to (c_high).
 * 
 * AQI thresholds for health effects according to norms
 * 0 <= i <= 50: Good - Level 1,
 * 51 <= i <= 100: Moderate - Level 2,
 * 101 <= i <= 150: Unhealthy for Sensitive Groups - Level 3,
 * 151 <= i <= 200: Unhealthy - Level 4,
 * 201 <= i <= 300: Very Unhealthy - Level 5,
 * 301 <= i <= 500: Hazardous - Level 6
 * 
 */

class Aqi {
  constructor() {
    (this.level_1 = {
      i_low: 0,
      i_high: 50,
      c_low: {
        tsp: 0,
        so2: 0,
        no2: 0,
      },
      c_high: {
        tsp: 15.4,
        so2: 35,
        no2: 53,
      },
    }),
      (this.level_2 = {
        i_low: 51,
        i_high: 100,
        c_low: {
          tsp: 15.5,
          so2: 36,
          no2: 54,
        },
        c_high: {
          tsp: 40.4,
          so2: 75,
          no2: 100,
        },
      }),
      (this.level_3 = {
        i_low: 101,
        i_high: 150,
        c_low: {
          tsp: 40.5,
          so2: 76,
          no2: 101,
        },
        c_high: {
          tsp: 65.4,
          so2: 185,
          no2: 360,
        },
      }),
      (this.level_4 = {
        i_low: 151,
        i_high: 200,
        c_low: {
          tsp: 65.5,
          so2: 186,
          no2: 361,
        },
        c_high: {
          tsp: 150.4,
          so2: 304,
          no2: 649,
        },
      }),
      (this.level_5 = {
        i_low: 201,
        i_high: 300,
        c_low: {
          tsp: 150.5,
          so2: 305,
          no2: 650,
        },
        c_high: {
          tsp: 250.4,
          so2: 604,
          no2: 1249,
        },
      }),
      (this.level_6 = {
        i_low: 301,
        i_high: 500,
        c_low: {
          tsp: 250.5,
          so2: 605,
          no2: 1250,
        },
        c_high: {
          tsp: 500.4,
          so2: 1004,
          no2: 2049,
        },
      });
  }
  compute(data) {
    var aqi
    const type = data.type;
    var value = data.value;

    const level_1_i_low = this.level_1.i_low;
    const level_2_i_low = this.level_2.i_low;
    const level_3_i_low = this.level_3.i_low;
    const level_4_i_low = this.level_4.i_low;
    const level_5_i_low = this.level_5.i_low;
    const level_6_i_low = this.level_6.i_low;

    const level_1_i_high = this.level_1.i_high;
    const level_2_i_high = this.level_2.i_high;
    const level_3_i_high = this.level_3.i_high;
    const level_4_i_high = this.level_4.i_high;
    const level_5_i_high = this.level_5.i_high;
    const level_6_i_high = this.level_6.i_high;

    const level_1_c_low = this.level_1.c_low;
    const level_2_c_low = this.level_2.c_low;
    const level_3_c_low = this.level_3.c_low;
    const level_4_c_low = this.level_4.c_low;
    const level_5_c_low = this.level_5.c_low;
    const level_6_c_low = this.level_6.c_low;

    const level_1_c_high = this.level_1.c_high;
    const level_2_c_high = this.level_2.c_high;
    const level_3_c_high = this.level_3.c_high;
    const level_4_c_high = this.level_4.c_high;
    const level_5_c_high = this.level_5.c_high;
    const level_6_c_high = this.level_6.c_high;

    if (type === "tsp") {
      if (value >= level_1_c_low.tsp && value <= level_1_c_high.tsp) {
        aqi =
          ((level_1_i_high - level_1_i_low) /
            (level_1_c_high.tsp - level_1_c_low.tsp)) *
            (value - level_1_c_low.tsp) +
          level_1_i_low;
      } else if (value >= level_2_c_low.tsp && value <= level_2_c_high.tsp) {
        aqi =
          ((level_2_i_high - level_2_i_low) /
            (level_2_c_high.tsp - level_2_c_low.tsp)) *
            (value - level_2_c_low.tsp) +
          level_2_i_low;
      } else if (value >= level_3_c_low.tsp && value <= level_3_c_high.tsp) {
        aqi =
          ((level_3_i_high - level_3_i_low) /
            (level_3_c_high.tsp - level_3_c_low.tsp)) *
            (value - level_3_c_low.tsp) +
          level_3_i_low;
      } else if (value >= level_4_c_low.tsp && value <= level_4_c_high.tsp) {
        aqi =
          ((level_4_i_high - level_4_i_low) /
            (level_4_c_high.tsp - level_4_c_low.tsp)) *
            (value - level_4_c_low.tsp) +
          level_4_i_low;
      } else if (value >= level_5_c_low.tsp && value <= level_5_c_high.tsp) {
        aqi =
          ((level_5_i_high - level_5_i_low) /
            (level_5_c_high.tsp - level_5_c_low.tsp)) *
            (value - level_5_c_low.tsp) +
          level_5_i_low;
      } else if (value >= level_6_c_low.tsp && value <= level_6_c_high.tsp) {
        aqi =
          ((level_6_i_high - level_6_i_low) /
            (level_6_c_high.tsp - level_6_c_low.tsp)) *
            (value - level_6_c_low.tsp) +
          level_6_i_low;
      } else if (value > level_6_c_high.tsp) {
        aqi = level_6_i_high;
      }
    }

    if (type === "so2") {
      if (value >= level_1_c_low.so2 && value <= level_1_c_high.so2) {
        aqi =
          ((level_1_i_high - level_1_i_low) /
            (level_1_c_high.so2 - level_1_c_low.so2)) *
            (value - level_1_c_low.so2) +
          level_1_i_low;
      } else if (value >= level_2_c_low.so2 && value <= level_2_c_high.so2) {
        aqi =
          ((level_2_i_high - level_2_i_low) /
            (level_2_c_high.so2 - level_2_c_low.so2)) *
            (value - level_2_c_low.so2) +
          level_2_i_low;
      } else if (value >= level_3_c_low.so2 && value <= level_3_c_high.so2) {
        aqi =
          ((level_3_i_high - level_3_i_low) /
            (level_3_c_high.so2 - level_3_c_low.so2)) *
            (value - level_3_c_low.so2) +
          level_3_i_low;
      } else if (value >= level_4_c_low.so2 && value <= level_4_c_high.so2) {
        aqi =
          ((level_4_i_high - level_4_i_low) /
            (level_4_c_high.so2 - level_4_c_low.so2)) *
            (value - level_4_c_low.so2) +
          level_4_i_low;
      } else if (value >= level_5_c_low.so2 && value <= level_5_c_high.so2) {
        aqi =
          ((level_5_i_high - level_5_i_low) /
            (level_5_c_high.so2 - level_5_c_low.so2)) *
            (value - level_5_c_low.so2) +
          level_5_i_low;
      } else if (value >= level_6_c_low.so2 && value <= level_6_c_high.so2) {
        aqi =
          ((level_6_i_high - level_6_i_low) /
            (level_6_c_high.so2 - level_6_c_low.so2)) *
            (value - level_6_c_low.so2) +
          level_6_i_low;
      } else if (value > level_6_c_high.so2) {
        aqi = level_6_i_high;
      }
    }

    if (type === "no2") {
      if (value >= level_1_c_low.no2 && value <= level_1_c_high.no2) {
        aqi =
          ((level_1_i_high - level_1_i_low) /
            (level_1_c_high.no2 - level_1_c_low.no2)) *
            (value - level_1_c_low.no2) +
          level_1_i_low;
      } else if (value >= level_2_c_low.no2 && value <= level_2_c_high.no2) {
        aqi =
          ((level_2_i_high - level_2_i_low) /
            (level_2_c_high.no2 - level_2_c_low.no2)) *
            (value - level_2_c_low.no2) +
          level_2_i_low;
      } else if (value >= level_3_c_low.no2 && value <= level_3_c_high.no2) {
        aqi =
          ((level_3_i_high - level_3_i_low) /
            (level_3_c_high.no2 - level_3_c_low.no2)) *
            (value - level_3_c_low.no2) +
          level_3_i_low;
      } else if (value >= level_4_c_low.no2 && value <= level_4_c_high.no2) {
        aqi =
          ((level_4_i_high - level_4_i_low) /
            (level_4_c_high.no2 - level_4_c_low.no2)) *
            (value - level_4_c_low.no2) +
          level_4_i_low;
      } else if (value >= level_5_c_low.no2 && value <= level_5_c_high.no2) {
        aqi =
          ((level_5_i_high - level_5_i_low) /
            (level_5_c_high.no2 - level_5_c_low.no2)) *
            (value - level_5_c_low.no2) +
          level_5_i_low;
      } else if (value >= level_6_c_low.no2 && value <= level_6_c_high.no2) {
        aqi =
          ((level_6_i_high - level_6_i_low) /
            (level_6_c_high.no2 - level_6_c_low.no2)) *
            (value - level_6_c_low.no2) +
          level_6_i_low;
      } else if (value > level_6_c_high.no2) {
        aqi = level_6_i_high;
      }
    }

    aqi = Math.floor(aqi);
    return aqi;
  }
}

module.exports = new Aqi();
