// main.js
$(document).ready(function(){


 }
        });
      });



 <div>
                <h3>Delete Resources</h3>
                <form id="deleteone">
                  <input name="resourceid" type="text" placeholder="Insert ID">
                  <input name="deleteone" type="submit" value="Delete a Resource">
                  <input class="resourceid" name="resourceid" type="hidden">
                </form>

            </div>


<section class="col-sm-6">
        <div class="container">
        <h3>Add Resources</h3>
        <div>
        <form id="resource-form">
                <input name="category" type="text" placeholder="category">
                <input name="description" type="text" placeholder="list resource">
                <input name="resource" type="submit" value="add resources">
                <input class="token" name="token" type="hidden">
                <input class="id" name="id" type="hidden">
        </form>
        </div>
            <div id="myResources" value="Resource">
               <input name="resource" type="submit" value="List">
                <input class="token" name="token" type="hidden">
                <input class="id" name="id" type="hidden">
                <ul class="myResources">My Resources</ul>
                <li></li>
            </div>
