
export const enum DataParameter{
    TEMPERATURE = 0,
    CO2 = 1,
    PM10 = 2,
    PM2_5 = 3,
    PM1 = 4,
    PRESSURE = 5,
    HUMIDITY = 6
};

export const enum IconsDataParameter{
    TEMPERATURE = 0,
    CO2 = 1,
    PM10 = 2,
    PM2_5 = 3,
    PM1 = 4,
    PRESSURE = 5,
    HUMIDITY = 6
};

export enum DataFormat{
    INTEGER = 0,
    DOUBLE = 1,
    STRING = 2
};

export function dataParameterToString(val:DataParameter) : string
{
    switch(val)
    {
        case 0: {return "TEMPERATURE"}
        case 1: {return "CO2"}
        case 2: {return "PM10"}
        case 3: {return "PM2_5"}
        case 4: {return "PM1"}
        case 5: {return "PRESSURE"}
        case 6: {return "HUMIDITY"}
    }
    return "UNDEFINED"
}

export function iconsDataParameterToString(val:IconsDataParameter) : string
{
    switch(val)
    {
        case 0: {return "fas fa-thermometer-three-quarters"}
        case 1: {return ""}
        case 2: {return "fab fa-cloudversify text-black"}
        case 3: {return "fab fa-cloudversify"}
        case 4: {return "fab fa-cloudversify"}
        case 5: {return ""}
        case 6: {return "fas fa-tint"}
    }
    return "UNDEFINED"
}

export function dataFormatToString(val:DataParameter) : string
{
    switch(val)
    {
        case 0: {return "INTEGER"}
        case 1: {return "DOUBLE"}
        case 2: {return "STRING"}
    }
}

export function stringifyDataParameter()
{
  let res = new Array();
  for(var i = 0; i<7; i++)
  {
    res.push({
              name: dataParameterToString(i),
              id: String(i),
              icon: iconsDataParameterToString(i)
            });
  }
  return res;
}
