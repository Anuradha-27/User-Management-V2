<script>
  import { Tooltip } from "@svelte-plugins/tooltips";
  import Loader from './Loader.svelte';
  import { Confirm } from 'svelte-confirm'
  import {createEventDispatcher, onMount} from'svelte';
  const dispatch = createEventDispatcher();
  export let totalRecords;
  export let pageBlockToShow;
  export let availableRecordPerPage; 
  export let userData;
  export let getData;
  export let page;
  export let searchArray;
  export let searchEmail;
    
  let loading=true;
  const handlePrev = () => {
    dispatch("prev", { message: "prev" });
  };
  const handleNext = () => {
    dispatch("next", { message: "next" });
  };
  const handlePage = (page) => {
    if (page===0) {
      page=1
    } else {
      page=page
    }
    dispatch("page", page);
  };
  let searchValue
  const handleSearchEvent = ()=>{
        dispatch("searchEvent",{searchValue:searchValue})
    }

  // onMount(() => {
   
  //     getData();
  //     setTimeout(() => {
  //       loading = false;
  //     }, 1000);
  // })
 
  onMount(() => {
    if (searchEmail === "") {
      getData();
      setTimeout(() => {
        loading = false;
      }, 1000);
    }
    getData(searchEmail);
    setTimeout(() => {
      loading = false;
    }, 1000);
    // getData();
    // setTimeout(() => {
    //   loading = false;
    // }, 1000);
  });

const handleDeleteEvent = (data)=>{
    dispatch('userDelete', data.u_id);
  }
  const handleUpdateEvent = (data) =>{
    dispatch('userUpdate',data);
  }

</script>


<Confirm
  let:confirm="{confirmThis}"
>
<div class="form-outline">
<div class="page-item float-right">
  <input type="search" placeholder="SearchByEmail" class="=form control"  id="search"   bind:value={searchValue}
  on:keypress={(e)=>{
      if(e.key==='Enter'){
          handleSearchEvent()
      }
  }}>
</div>
</div>

{#if loading}
  <span><Loader /></span>
{:else}
  
<table class="table table-striped table-hover">
  <thead>
      <tr>
          
          <th>Name</th>						
          <th>Email</th>
          <th>Gender</th>
          <th>Address</th>
          <th>Birthday</th>
          <th>Operation</th>
      </tr>
  </thead>
  <tbody>
    {#each userData as user}
      <tr>
        <td>{user.f_name}
            {user.m_name}
            {user.l_name}
        </td>
        <td>{user.email}</td>
        <td>{user.gender}</td>
        <td>{user.apart_name},
            {user.locality},
            {user.landmark},
            {user.city},
            {user.state_name},
            {user.pincode}
           
        </td>
        <td>{user.dob}</td>
        <td>
          <Tooltip content="Edit">

              <a href="#" class="settings"   on:click={handleUpdateEvent(user)} ><i class="material-icons">&#xE8B8;</i></a>
          	</Tooltip>

             <Confirm 
              confirmTitle="Delete"
            cancelTitle="Cancel"
            let:confirm="{confirmThis}" >
            <Tooltip content="Delete">

            <i  style=" color: red; cursor: pointer; font-size: 25px;" class="material-icons" on:click="{() => confirmThis(handleDeleteEvent,user)}">&#xE872;</i>
           
       
          </Tooltip>
            </Confirm>

          </td>
      </tr>
  
    {/each}  
  </tbody>
  
</table>

<div class="clearfix">
    <div class="hint-text">Showing <b>{availableRecordPerPage}</b> out of <b>{totalRecords}</b> entries</div>
    
    <ul class="pagination">
      <li class="page-item">
        <a
          href="#"
          class={1 === page ? "invisible" : "page-link"}
          on:click={() => {
            handlePrev();
           
            
          }}>Previous</a
        >
      </li>
      {#each Array(pageBlockToShow) as pbs, i}
        <li class={page === i ? "page-item active" : "page-item"}>
          <a
            href="#"
            on:click={() => {
              handlePage(i);
              loading = true;
              setTimeout(() => {
                loading = false;
              }, 1000);
            }}
            class="page-item">{i++ + 1}</a
          >
        </li>
      {/each}
      <li class="page-item ">
        <a
          href="#"
          class={pageBlockToShow === page ? "invisible" : "page-link"}
          on:click={() => {
             handleNext();
            loading = true;
            setTimeout(() => {
              loading = false;
            }, 1000);
           
          }}>Next</a
        >
      </li>
    </ul>
  </div>

{/if}
</Confirm>

<style>
  
 
 table.table tr th, table.table tr td {
    border-color: #e9e9e9;
    padding: 12px 15px;
    vertical-align: middle;
    font-family: Arial, Helvetica, sans-serif;
}
table.table tr th:first-child {
    width: 200px;
}
table.table tr th:last-child {
    width: 100px;
}
table.table-striped tbody tr:nth-of-type(odd) {
    background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
    background: #f5f5f5;
}
table.table th i {
    font-size: 13px;
    margin: 0 5px;
    cursor: pointer;
}	
table.table td:last-child i {
    opacity: 0.9;
    font-size: 22px;
    margin: 0 5px;
}
table.table td a {
    font-weight: bold;
    color: #566787;
    display: inline-block;
    text-decoration: none;
}
table.table td a:hover {
    color: #2196F3;
}
table.table td a.settings {
    color: #2196F3;
}

table.table td i {
    font-size: 19px;
}

.pagination {
    float: right;
    margin: 0 0 5px;
}
.pagination li a {
    border: none;
    font-size: 13px;
    min-width: 30px;
    min-height: 30px;
    color: #999;
    margin: 0 2px;
    line-height: 30px;
    border-radius: 2px !important;
    text-align: center;
    padding: 0 6px;
}
.pagination li a:hover {
    color: #666;
}	
.pagination li.active a, .pagination li.active a {
    background:skyblue;
    color:white;
}
.pagination li.active a:hover {        
    background: #0397d6;
} 

  .hint-text {
    float: left;
    margin-top: 10px;
    font-size: 13px;
  }


 
  </style>
  