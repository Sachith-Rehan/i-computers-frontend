export default function getFormattedPrice(price) {
      if(price == null){
            return "N/A";
      }

      const priceInNumber = Number(price);

      if (isNaN(priceInNumber)) {
            return "N/A";
      }else{
            return "LKR " + priceInNumber.toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2});
      }
}