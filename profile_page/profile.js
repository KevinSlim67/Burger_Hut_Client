const url = "http://localhost:5000/users";

getAddresses();

function createAddress() {
    closeCreateAddress();
    const body = document.body;
    const div = document.createElement('div');
    div.classList.add('create-address');

    div.innerHTML = `
            <form class="account-form" name="createAddress" onsubmit="addAddress(event)">
                <div class="shape1"></div>
                <div class="shape2"></div>
                <button class="exit" onclick="closeCreateAddress()"></button>
                <h2>Create New Address</h2>

                <div class="input-box">
                    <input class="style1" type="text" name="name" id="name" placeholder=" "/>
                    <span>Address Name</span>
                </div>

                <div class="double-field">
                    <select name="district" id="district" required>
                        <option disabled selected>District</option>
                    </select>

                    <select name="city" id="city" required>
                        <option disabled selected>City</option>
                    </select>
                </div>

                <div class="double-field">
                    <div class="input-box">
                        <input class="style1" type="text" name="streetName" id="streetName" placeholder=" " required/>
                        <span>Street Name</span>
                    </div>

                    <div class="input-box">
                        <input class="style1" type="text" name="buildingName" id="buildingName" placeholder=" " required/>
                        <span>Building Name</span>
                    </div>
                </div>

                <div class="double-field">
                    <div class="input-box">
                        <input class="style1" type="number" name="floorNumber" id="floorNumber" placeholder=" " required/>
                        <span>Floor Number</span>
                    </div>

                    <div class="input-box">
                        <input class="style1" type="text" name="roomNumber" id="roomNumber" placeholder=" "/>
                        <span>Room Number</span>
                    </div>
                </div>

                <div class="double-field">
                    <div class="input-box">
                        <input class="style1" type="text" name="landmark" id="landmark" placeholder=" "/>
                        <span>Landmark</span>
                    </div>

                    <div class="input-box">
                        <input class="style1" type="text" name="companyName" id="companyName" placeholder=" "/>
                        <span>Company Name</span>
                    </div>
                </div>

                <div class="input-box">
                    <textarea class="style1" type="text" name="additionalInfo" id="additionalInfo" placeholder=" "></textarea>
                    <span>Additional Information</span>
                </div>

                <input type="submit" class="type1 full submit" value="Submit Address">
            </form>  
    `;

    body.append(div);
    fetchDistricts();
}


function closeCreateAddress() {
    const body = document.body;

    const div = document.getElementsByClassName('create-address')[0];
    if (div !== undefined) body.removeChild(div);
}

function fetchDistricts() {
    fetch('./../components/account_form/districts.json')
        .then(response => response.json())
        .then(data => {
            const districts = document.getElementById('district');
            for (key in data) {
                const option = document.createElement('option');
                option.value = key;
                option.innerText = key;
                districts.appendChild(option);
            }
            districts.onchange = () => getDistrictCities(districts.value);
        });
}

function getDistrictCities(district) {
    if (district === 'District') return;
    fetch('./../components/account_form/districts.json')
        .then(response => response.json())
        .then(data => {
            const cities = document.getElementById('city');
            cities.innerHTML = '';
            const districts = [...data[district]];
            districts.map(d => {
                const option = document.createElement('option');
                option.value = d;
                option.innerText = d;
                cities.appendChild(option);
            })
        });
}

function addAddress(e) {
    e.preventDefault();
    const address = extractData();
    if (address === null) return;

    fetch(`${url}/add-address`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...address, userId: sessionStorage.getItem('userId') }),
    })
        .then((res) => res.json())
        .then((data) => {
            getAddresses();
            //TO DO : Send confirmation message or error message depending on the result
        })
        .catch((err) => console.error(err));

    return false;
}

//gets data submitted by Sign Up form
function extractData() {
    const { name, district, city, streetName, buildingName, floorNumber, roomNumber, landmark, companyName, additionalInfo } = document.createAddress;

    return {
        name: name.value,
        district: district.value,
        city: city.value,
        streetName: streetName.value,
        buildingName: buildingName.value,
        floorNumber: floorNumber.value,
        roomNumber: roomNumber.value,
        landmark: landmark.value,
        companyName: companyName.value,
        additionalInfo: additionalInfo.value,
    };
}

function createAddressBox(address) {
    const { id, name, district, city, street_name, building_name, floor_number, room_number, company_name, landmark } = address;
    const streetField = street_name !== null ? `, ${street_name}`: '';
    const buildingField = building_name !== null ? `${building_name} Building`: '';
    const floorNumField = floor_number !== null ? `Floor ${floor_number}`: '';
    const roomNumField = room_number!== null ? `Room ${room_number}`: '';
    const companyNameField = company_name !== null ? `At ${company_name}`: '';
    const landmarkField = landmark !== null ? `Near ${landmark}`: '';


    const addressBox = document.createElement('div');
    addressBox.classList.add('address');
    addressBox.setAttribute('id', id);

    addressBox.innerHTML = `
        <h3>${name}</h3>
        <p> ${district} District, ${city} ${streetField} </p>
        <p>${[buildingField, floorNumField, roomNumField].filter(e => e !== '').join(', ')} </p>
        <p>${[companyNameField, landmarkField].filter(e => e !== '').join(' - ')} </p>
        

        <button class="delete" onclick="deleteAddress(${id})"></button>
        <button class="edit"></button>
    `;
    return addressBox;
}

//Get all of the user's addresses
function getAddresses() {
    let userId = sessionStorage.getItem('userId');
    fetch(`${url}/addresses/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => {
            fillAddressBook(res);
        })
        .catch((err) => console.error(err));
}

//fill address book with addresses from user
function fillAddressBook(arr) {
    //empties current food list
    const list = document.getElementById('address-list');
    list.innerHTML = '';

    arr.forEach(e => {
        list.appendChild(createAddressBox(e));
    });
}

function deleteAddress(id) {
 //fetches new data
 fetch(`${url}/address/delete`, {
    method: "DELETE",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({id: id})
})
    .then((res) => res.json())
    .then((res) => {
        console.log(res); //TO DO : Handle returned status;
        getAddresses();
    })
    .catch((err) => console.error(err));
}