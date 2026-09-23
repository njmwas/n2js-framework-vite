import State, { type StateTypeEventType } from "../lib/state";

console.log("Nice")

const appState: StateTypeEventType<{
  name: string,
  counter: number,
  address: StateTypeEventType<{
    city: string,
    country: string,
    counter: number,
    address: StateTypeEventType<{
      home: string,
      code: number,
      counter: number
    }>
  }>
}> = State({
  name: "Json",
  counter: 0,
  address: {
    city: "Nairobi",
    country: "Kenya",
    counter: 0,
    address: {
      home: "lksdf",
      code: 23432,
      counter: 0
    }
  }
});

console.log(
  appState.name,
  appState.address
)

// appState.;

appState.__subscribe!("counter", (newCount: number) => console.log("NewCount", newCount));
appState.address.__subscribe!("counter", (newCount: number) => console.log("addressCounter", newCount));
appState.address.address.__subscribe!("counter", (newCount: number) => console.log("innerAddressCounter", newCount));

/* subscribe("counter", (counter)=>{
  console.log("Account:", counter)
});

subscribe("address.counter", (addressCounter)=>{
  console.log("AddressCounter:", addressCounter)
});

subscribe("address.address.counter", (innerAddressCounter)=>{
  console.log("innerAddressCounter:", innerAddressCounter)
}); */

// console.log(appState.address instanceof ProxyConstructor)

setInterval(() => {
  // console.log(appState)
  // appState.counter += 1
  // appState.address.counter += 1;
  // appState.address.address.counter += 1;
}, 1000);

// console.log(appState.counter)
// console.log(appState.address)