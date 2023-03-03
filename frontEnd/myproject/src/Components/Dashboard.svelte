<script>
  import Table from "./Table.svelte";
  import Form from "./Form.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  let searchEmail = "";
  let searchArray=[];
  let loading=true;
  let displayStatus = "default";
  const home = () => {
    displayStatus = "default";
  };
  const registerUser = () => {
    displayStatus = "openForm";
  };
  $: page =1;
  let totalRecords="";
  let availableRecordPerPage=""
  let pageBlockToShow=""
 
  let disabled=true;
  let userData = [];
  $: pageNumber = (e) => {
    if (e.detail.message === "next" && page < totalRecords) {
      page++;
      getData();
    } else if (e.detail.message === "prev" && page > 1 && page <= totalRecords) {
      page--;
      getData();
      console.log("prev pressed");
    } else if (e.detail > 0 && e.detail <= totalRecords) {
      page = e.detail;
      getData();
    }
  }; 
  
  let editUserData;
  const displayForm = (e) => {
    displayStatus = "updateDataForm";
    editUserData = e.detail;
  };
  
  const searchUserEmail=(e)=>{
    console.log(e.detail.searchValue)
    if (e.detail==="") {
      return ;
    }
    searchEmail=e.detail.searchValue.trim();
    displayStatus="searchedUser";
  }
  const searchUserData= async(email)=>{
         console.log(email)
        const res = await fetch(
            `http://localhost:3000/user/${email}`,
            {
                method: "GET",
                headers: { "content-type": "application/json" },
            }
        );
        const dataFromAPI = await res.json()
        console.log(dataFromAPI)
        searchArray=dataFromAPI;
        totalRecords=searchArray.length;
    availableRecordPerPage=searchArray.length;
    pageBlockToShow=1
    }
  const getData = async () => {
   try{ 
    const url=`http://localhost:3000/user/data/paginate?page=${page}&limit=5`
    console.log(url)
    const res = await fetch(url, {
        method: "GET",
      });
    const dataFromAPI = await res.json();
    console.log(dataFromAPI)
    userData = dataFromAPI.data;
    totalRecords=dataFromAPI.totalRecords;
    availableRecordPerPage=userData.length;
    pageBlockToShow=Math.ceil(totalRecords/5)
  }catch (error) {
      console.log(error);
    } finally {
      () => {
        loading = false;
      }
    }
  };


  const doPost = async (e) => {
    console.log(e.detail)
    let userData = e.detail;
    if (
      userData.f_name==="",
      userData.m_name==="",
      userData.l_name==="",
      userData.dob==="",
      // userData.Ph_No
      userData.gender==="",
    
      userData.email==="",
      userData.password==="",
      userData.apart_name==="",
      userData.locality==="",
      userData.landmark==="",
      userData.city==="",
      userData.pincode==="",
      userData.state_name===""
)
     {
      disabled=true;
    console.log("invalid data");
    } else {
      displayStatus = "formSubmit";
    try {
      const res = await fetch("http://localhost:3000/user/user",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          f_name: userData.f_name,
          m_name: userData.m_name,
          l_name: userData.l_name,
          dob: userData.dob,
          gender: userData.gender,
          email: userData.email,
          password: userData.password,
          apart_name: userData.apart_name,
          locality: userData.locality,
          landmark: userData.landmark,
          city: userData.city,
          pincode: userData.pincode,
          state_name: userData.state_name

        }),
      });
      console.log(userData.Password);
      toast.success('Registered successfully', {
    position: "bottom-center"
  })
      console.log(userData);
      getData();
    } catch (error) {
      console.log(error);
    }
  }
  };

  const handleUserUpdateDetail = (e) => {
    displayStatus = "updateDataShow";
    console.log(e.detail);
    let id = e.detail.u_id;
    console.log(id);
    {
      fetch(`http://localhost:3000/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          f_name: e.detail.f_name,
          m_name: e.detail.m_name,
          l_name: e.detail.l_name,
          dob: e.detail.dob,
          gender: e.detail.gender,

          email: e.detail.email,
          password: e.detail.password,
          apart_name: e.detail.apart_name,
          locality: e.detail.locality,
          landmark: e.detail.landmark,
          city: e.detail.city,
          state_name: e.detail.state_name,
          pincode: e.detail.pincode,
        }),
      })
        .then((response) => response.json())
        .then((result) => getData())
        
        toast.success('Data updated successfully', {
    position: "bottom-center"
  })
    }
  };

  const handleUserDelete = (e) => {
    var tempId = "";
    console.log(e.detail.id);

    fetch(`http://localhost:3000/user/` + e.detail, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((result) => getData());
    for (let index = 0; index < userData.length; index++) {
      if (e.detail === userData[index].id) {
        tempId = index;
      }
    }
    userData.splice(tempId, 1);
    userData = userData;
    toast.success('Data deleted successfully', {
    position: "bottom-center"
  })
  };
</script>
<Toaster />
<div class="container-xl">
  <div class="table-responsive">
    <div class="table-wrapper">
      <div class="table-title">
        <div class="row">
          <div class="col-sm-5">
            <h2>User <b>Management</b></h2>
          </div>
          <div class="col-sm-7">
            
            <a href="#" class="btn btn-secondary" on:click={registerUser}><i class="material-icons">&#xE147;</i>
              <span>Add New User</span></a>
            <a href="#" class="btn btn-secondary" on:click={home}><i class="material-icons">home</i> <span>Home</span></a>
          </div>
        </div>
      </div>

    {#if displayStatus === "addClicked" || displayStatus === "updateDataForm" || displayStatus === "openForm"}
        <Form
          on:userObject={doPost}
          on:onUpdate={handleUserUpdateDetail}
          {editUserData}
          {displayStatus}
          {userData}
        />
      {:else if displayStatus === "formSubmit" || displayStatus === "default" || displayStatus === "updateDataShow"}
        <Table
          {userData}
          {getData}
          {page}
          on:userDelete={handleUserDelete}
          on:userUpdate={displayForm}
          { totalRecords}
          {pageBlockToShow}
          {availableRecordPerPage}
          on:next={pageNumber}
          on:page={pageNumber}
          on:prev={pageNumber}
          on:searchEvent={searchUserEmail}
        />
        {:else if displayStatus==='searchedUser'}
        <Table
          userData={searchArray}
          getData={searchUserData}
          {page}
          {searchEmail}
          on:userDelete={handleUserDelete}
          on:userUpdate={displayForm}
          { totalRecords}
          {pageBlockToShow}
          {availableRecordPerPage}
          on:next={pageNumber}
          on:page={pageNumber}
          on:prev={pageNumber}
        />
      {/if}
    </div>
  </div>
</div>

<style>
  .container-xl {
    margin-left: 0px;
    margin-right: 0px;
    max-width: 1294px;
    padding: 0px;
    font-family: Arial, Helvetica, sans-serif;

  }
  .table-responsive {
    margin-top: -10px;
  }
  .table-wrapper {
    width: 100%;
    background: #fff;
    padding-left: 0px;
    padding-right: 0px;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  }
  .table-title {
    font-family: Arial, Helvetica, sans-serif;

    padding-top: 15px;
    padding-bottom: 15px;
    background: #299be4;
    color: #fff;
    padding: 16px 30px;
    border-radius: 3px 3px 0 0;
  }
  .table-title h2 {
    margin: 5px 0 0;
    font-size: 24px;
  }
  .table-title .btn {
    color: #566787;
    float: right;
    font-size: 13px;
    background: #fff;
    border: none;
    min-width: 50px;
    border-radius: 2px;
    border: none;
    outline: none !important;
    margin-left: 10px;
  }
  .table-title .btn:hover,
  .table-title .btn:focus {
    color: #566787;
    background: #f2f2f2;
  }
  .table-title .btn i {
    float: left;
    font-size: 21px;
    margin-right: 5px;
  }
  .table-title .btn span {
    float: left;
    margin-top: 2px;
  }
</style>
