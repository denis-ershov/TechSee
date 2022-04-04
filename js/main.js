function tusd() {
  let now = new Date().toLocaleDateString();
  let text = "Курс доллара на " + now;
  document.querySelector("#tusd").innerHTML = text;
}

async function usd() {
  let url = "https://www.cbr-xml-daily.ru/daily_json.js";
  let response = await fetch(url);
  let data = await response.json();
  let cbr = data.Valute.USD.Value;
  return cbr;
}

async function bb() {
  let id = "6469925";
  let url =
    "https://api.bestbuy.com/v1/products/" +
    id +
    ".json?show=sku,name,salePrice&apiKey=WsZYk44qBGD8qima1OTZ59Gg";
  let response = await fetch(url);
  let data = await response.json();
  let price = data.salePrice;
  return price;
}

async function ng() {
  let id = "9SIADVWHY45136";
  let url =
    "https://www.newegg.com/product/api/ProductRealtime?ItemNumber=" + id;
  let response = await fetch(url);
  let data = await response.json();
  let price = data.MainItem.UnitCost;
  return price;
}

async function ds() {
  let id = "386727-01";
  let url = "https://api.dyson.com/apiman-gateway/dyson/product/1.0/us/" + id;
  let response = await fetch(url);
  let data = await response.json();
  let price = data.grossPrice.value;
  return price;
}

async function base() {
  let data = {
    1: {
      store: 'BestBuy',
      name: "Dyson Supersonic HD07",
      price: await bb()
    },
    2: {
        store: 'NewEgg',
      name: "Dyson Supersonic HD07",
      price: await ng(),
    },
    3: {
        store: 'Dyson',
      name: "Dyson Supersonic HD07",
      price: await ds(),
    }
  };
  return data;
}

async function print() {
  const json = await base();
  let tbody = document.querySelector(".data");
  let tr = "";
  let data = json;
  let fusd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    //maximumFractionDigits: 0
  });
  let cusd = fusd.format(await usd());

  for (let key in data) {
      let sum = (Number(data[key].price) + Number(parseFloat('35.45'))) * parseFloat(await usd());
        //console.log(Number(data[key].price) + parseFloat('35.45'));
      if (key != 1) {
          cusd = '';
      }
      tr = document.createElement("tr");
      tr.innerHTML =
        "<th>"+data[key].store+"</th><td>" +
        data[key].name +
        "</td><td>" +
        fusd.format(data[key].price) +
        "</td><td>"+
        fusd.format(35.45) +
        "</td><td>" +
        new Intl.NumberFormat("ru", {style: "currency", currency: "RUB", maximumFractionDigits: 0}).format(sum) +
        "</td><td></td><td>"+
        cusd
        +"</td>";
      tbody.append(tr);
  }
}

window.onload = function () {
  tusd(), print();
};
