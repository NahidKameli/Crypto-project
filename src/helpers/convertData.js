const convertData = (data, type) => {
    const key = type === "total_volume" ? "total_volumes" : type;
    if (!data[key]) {
      console.error(`Key "${key}" not found in data`);
      return [];
    }
    const convertedData = data[key].map(item => {
      return {
        date: new Date(item[0]).toLocaleDateString(),
        [type]: item[1]
      };
    });
    return convertedData;
  };
  
  export { convertData };