<script>

  import { createEventDispatcher } from "svelte";
  export let editUserData;
  export let displayStatus;
export let userData
  const dispatch = createEventDispatcher();
  // let userData;
  let blankObj = {
    f_name: "",
    m_name: "",
    l_name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    apart_name: "",
    locality: "",
    landmark: "",
    city: "",
    state_name: "",
    pincode: "",
  };
  if (displayStatus === "updateDataForm") {
    userData = editUserData = {
      u_id:editUserData.u_id,
      f_name: editUserData.f_name,
      m_name: editUserData.m_name,
      l_name: editUserData.l_name,
      dob: editUserData.dob,
      gender: editUserData.gender,
      email: editUserData.email,
      password: editUserData.password,
      apart_name: editUserData.apart_name,
      locality: editUserData.locality,
      landmark: editUserData.landmark,
      city: editUserData.city,
      state_name: editUserData.state_name,
      pincode: editUserData.pincode,
    };
  } else {
    userData=userData
  }
  let errors = {
    f_name: "",
    m_name: "",
    l_name: "",
    email: "",
   
    password: "",
    gender: "",
    apart_name: "",
    locality: "",
    landmark: "",
    city: "",
    state_name: "",
    pincode: "",
   
   
  };
  let valid = false;
  const submitButton = () => {
    valid = true;
    
    if (
      !userData.f_name.match(/^[a-zA-Z]+$/) ||
      userData.f_name.trim().length < 1
    ) {
      valid = false;
      errors.f_name = "Only alphabets allowed";
    } else {
      // valid = true
      errors.f_name = "";
    }
    if (userData.l_name.trim().length < 1) {
      valid = false;
      errors.l_name = "Only alphabets allowed";
    } else {
      // valid = true
      errors.l_name = "";
    }
    if ((!userData.email.match(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/))) {
            valid = false;
            errors.email = 'Enter valid email address';
           
        }else {
            // valid = true
            errors.email = '';
        }
    if ((!userData.password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/))) {
            valid = false;
            errors.password = 'Password should have at least one capital small and special letter';
        }else {
            // valid = true
            errors.password = '';
        }
        // if(userData.Password !== userData.cPassword){
        //   valid = false;
        //   errors.confirmPassword = 'Password and confirm-password are not match';
  
        // }else{
        //     //  valid = true
        //     errors.confirmPassword = '';
        // }
        var option=document.getElementsByName('gender');
     
      if (!(option[0].checked || option[1].checked|| option[2].checked)) {
        errors.gender=("Please Select Your Gender");
          valid= false;
        }
        else{
          errors.gender='';
        }
        if (userData.apart_name.match(/[^a-zA-Z]/)||userData.apart_name.trim().length < 1) {
            valid = false;
            errors.apart_name = 'Enter valid apartment no or name';
            
        }else {
            // valid = true
            errors.apart_name = '';
        }
        if (!userData.locality.match(/^[a-zA-Z]+$/)||userData.locality.trim().length < 1) {
            valid = false;
            errors.locality = 'Enter valid street name or Locality';
            
        }else {
            // valid = true
            errors.locality = '';
        }
      if (displayStatus === "updateDataForm") {
        dispatch("onUpdate", userData);
        
      } else {
        dispatch("userObject", userData);
      }
    
  };
</script>

<div class=" w-75 container center_div">
  <h2 >Registration Form</h2>

  <div class="form">
    <div class="row ">
      <div class="col">
        <label for="fname">First Name<span class="req">*</span></label>

        <input
        title="First name"
        type="text"
          class="form-control"
          placeholder="First name"
          bind:value={userData.f_name}
          on:blur={submitButton}
        />

        <span class="error">{errors.f_name}</span>
      </div>
      <div class="col">
        <label for="mname">Middle Name</label>

        <input
        title="Middle name"
         type="text"
          class="form-control"
          placeholder="Middle name"
          bind:value={userData.m_name}
        />

      </div>
      <div class="col">
        <label for="lname">Last Name<span class="req">*</span></label>

        <input
         title="Last name"
          type="text"
          class="form-control"
          placeholder="Last name"
          bind:value={userData.l_name} 
          on:blur={submitButton}
        />

        <span class="error">{errors.l_name}</span>
      </div>
    </div>
    <div class="row">
     
      <div class="col">
        <label for="email">Email<span class="req">*</span></label>

        <input
        title="Enter email"
         type="text"
          class="form-control"
          placeholder="Email"
          bind:value={userData.email}
          on:blur={submitButton}
        />
        <span class="error">{errors.email}</span>

      </div>
      <!-- <div class="col">
        <label for="ph_no">Contact<span class="req">*</span></label>

        <input
        title="Contact number"
         type="text"
          class="form-control"
          placeholder="Contact Number"
          bind:value={userData.Ph_No}
          on:blur={submitButton}
        />
        <span class="error">{errors.Ph_No}</span>

      </div> -->
    </div>

    <div class="row">
      <div class="col">
        <label for="pass">Password<span class="req">*</span></label>

        <input
        title="Password"
        type="password"
          class="form-control"
          placeholder="Password"
          bind:value={userData.password}
          on:blur={submitButton}
        />
        <span class="error">{errors.password}</span>

      </div>
      <div class="col">
        <label for="cpass">Confirm Password<span class="req">*</span></label>

        <input
          title="Confirm Password"
          type="password"
          class="form-control"
          placeholder=" Confirm password"/>
       
     </div>

    </div>
    <div class="row">
      <div class="col">
        <label for="dob">Date of Birth<span class="req">*</span></label>

        <input
        title="Date of Birth"
         type="text"
          placeholder="Select date"
          class="form-control"
          onfocus="(this.type='date')"
          min="1970-01-01"
          max="2005-12-31"
          required
          bind:value={userData.dob}
          on:blur={submitButton}
        />
      </div>
      <div class="col ">
        <!-- <label for="gender">Gender<span class="req">*</span></label>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" class="custom-control-input" id="customRadio1" name="gender"           bind:group={userData.Gender}
          >
          <label class="custom-control-label" for="customRadio2">Male</label>
        </div>        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" class="custom-control-input" id="customRadio2" name="gender"           bind:group={userData.Gender}
          >
          <label class="custom-control-label" for="customRadio2">Female</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" class="custom-control-input" id="customRadio3" name="gender"           bind:group={userData.Gender}
          >
          <label class="custom-control-label" for="customRadio3">Other</label>
        </div> -->
          <label for="gender">Gender<span class="req">*</span></label>

        <input
        title="Male"
        type="radio"
          value="Male"
          name="gender"
          bind:group={userData.gender}
          on:blur={submitButton}
          id="check"
        />
        Male 
        <input
        title="Female"

          type="radio"
          value="Female"
          name="gender"
          bind:group={userData.gender}
          on:blur={submitButton}
          id="check1"
        />
        Female
        <input
       
         title="Other"
          type="radio"
          value="Other"
          name="gender"
          bind:group={userData.gender}
          on:blur={submitButton}

          id="check3"
        /> Other
      <div>
        <span class="error">{errors.gender}</span>
      </div>
      </div>

    </div>
    <div class="row">
    
      <div class="col">
        <label for="addr">Building/Apartment<span class="req">*</span></label>

        <input
          title="Appartment Name"
          type="text"
          class="form-control"
          placeholder="Apartment name "
          bind:value={userData.apart_name}
          on:blur={submitButton}

        />
        <span class="error">{errors.apart_name}</span>

      </div>
      <div class="col">
        <label for="addr">Street or Locality<span class="req">*</span></label>

        <input
          title="Locality"
          type="text"
          class="form-control"
          placeholder="Street name"
          bind:value={userData.locality}
          on:blur={submitButton}

        />
      </div>
      <div class="col">
        <label for="addr">Landmark<span class="req">*</span></label>

        <input
          title="Landmark"
          type="text"
          class="form-control"
          placeholder="Landmark"
          bind:value={userData.landmark}
          on:blur={submitButton}

        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label for="addr">City<span class="req">*</span></label>
        <input
          title="City"
          type="text"
          class="form-control"
          placeholder="City name"
          bind:value={userData.city}
          on:blur={submitButton}

        />
       
       
      </div>
      <div class="col">
        <label for="state">State<span class="req">*</span></label>
        <select title="State" name="state" id="state" bind:value={userData.state_name}>
          <option value="" disabled selected hidden
            >Select State{userData.state_name}</option
          >
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Andaman and Nicobar Islands"
            >Andaman and Nicobar Islands</option
          >
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
          <option value="Daman and Diu">Daman and Diu</option>
          <option value="Delhi">Delhi</option>
          <option value="Lakshadweep">Lakshadweep</option>
          <option value="Puducherry">Puducherry</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
        </select>
      </div>

      <div class="col">
        <label for="pincode">Zipcode<span class="req">*</span></label>

        <input
          title="Zipcode"
          type="text"
          class="form-control"
          placeholder="Zipcode"
          bind:value={userData.pincode}
          on:blur={submitButton}

        />
      </div>
    </div>
  </div>

   <div class="row justify-content-center">
    <div class="col"></div>
    <div class="col">
    <button
      type="submit"
      class="  btn btn-primary btn-lg  row justify-content-center"
      on:click={submitButton}>Submit</button
    >
</div>
     <div class="col"></div>

</div>
</div>
<style>
  .error{
    color: red;
    font-size:x-small;
  }
  label {
    font-weight: bolder;
    font-family: Arial, Helvetica, sans-serif;

  }
  .form {
  
    width: 100%;
  }
  h2 {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;

  }
  .btn-lg{
    padding: 10px 20px;
    font-size: 20px;
    border-radius: 10px;
  }
  .btn-size {
    margin-top: 3px;

    padding-left: 10px;
    padding-right: 10px;
    font-size: large;
  }
  .req {
    color: rgb(208, 29, 29);
    font-size: large;
  }
  .custom-control .custom-control-label{
    font-family: Arial, Helvetica, sans-serif;

  }
  
</style>
