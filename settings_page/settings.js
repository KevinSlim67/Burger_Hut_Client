function createAddress() {
    closeCreateAddress();
    const body = document.body;
    const div = document.createElement('div');
    div.classList.add('create-address');

    div.innerHTML = `
            <form class="account-form" name="createAddress">
                <div class="shape1"></div>
                <div class="shape2"></div>
                <button class="exit" onclick="closeCreateAddress()"></button>
                <h2>Create New Address</h2>

                <div class="double-field">
                    <select name="area" id="area" required>
                        <option disabled selected>Area</option>
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
                        <input class="style1" type="text" name="building-name" id="building-name" placeholder=" " required/>
                        <span>Building Name</span>
                    </div>
                </div>

                <div class="double-field">
                    <div class="input-box">
                        <input class="style1" type="number" name="floor-number" id="floor-number" placeholder=" " required/>
                        <span>Floor Number</span>
                    </div>

                    <div class="input-box">
                        <input class="style1" type="number" name="room-number" id="room-number" placeholder=" "/>
                        <span>Room Number</span>
                    </div>
                </div>

                <div class="double-field">
                    <div class="input-box">
                        <input class="style1" type="number" name="landmark" id="landmark" placeholder=" "/>
                        <span>Landmark</span>
                    </div>

                    <div class="input-box">
                        <input class="style1" type="number" name="company-name" id="company-name" placeholder=" "/>
                        <span>Company Name</span>
                    </div>
                </div>

                <input type="submit" class="type1 full submit" value="Submit Address" onclick="sayHello()">
            </form>  
    `;

    body.append(div);
}


function closeCreateAddress() {
    const body = document.body;

    const div = document.getElementsByClassName('create-address')[0];
    if (div !== undefined) body.removeChild(div);
}