    <template>
        <div>
        <div class="loaderWrapper" v-if="loading">
            <div class="loader"></div>
        </div>
            <div class="navBar">
                <div class="navBar-left">
                    <div class="navBar-title">LostyFoundy</div>
                    <div v-on:click="insert()" v-if="authUser()">Insert</div>
                    <div v-on:click="logout()" v-if="authUser()">Logout</div>
                    <div v-on:click="login()" v-else>Login</div>
                </div>
                <div class="navBar-right">
                    <input type="text" v-model="search"/>
                    <button v-on:click="searchAction()">Search</button>
                </div>
            </div>
            <div class="list">
                <div class="list-header">
                    <div>Item Name</div>
                    <div>Room Found</div>
                    <div>PC Number</div>
                    <div>Found Date</div>
                    <div>Found Shift</div>
                    <div>Status</div>
                    <div>Taken By</div>
                </div>
                <div  class="list-list">
                    <div v-for="(item, index) in list">
                        <div class="list-item list-notAvailable" v-if="item.taker == '' || item.taker == undefined || item.taker == null" v-on:click="showAction(item)">
                            <div class="list-name">{{item.ItemName}}</div>
                            <div class="list-roomFound">{{item.RoomFound}}</div>
                            <div class="list-pcNumber">{{item.PCNumber}}</div>
                            <div class="list-foundDate">{{item.FoundDate}}</div>
                            <div class="list-foundShift">{{item.FoundShift}}</div>
                            <div class="list-statusNot" >Not Taken</div>
                            <div class="list-statusNot">None</div>
                        </div>
                        <div class="list-item list-available" v-else v-on:click="showAction(item)">
                            <div class="list-name">{{item.ItemName}}</div>
                            <div class="list-roomFound">{{item.RoomFound}}</div>
                            <div class="list-pcNumber">{{item.PCNumber}}</div>
                            <div class="list-foundDate">{{item.FoundDate}}</div>
                            <div class="list-foundShift">{{item.FoundShift}}</div>
                            <div class="list-statusNot" >Taken</div>
                            <div class="list-statusNot">{{item.taker.ID}} - {{item.taker.TakerName}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-pagination">
                <input type ="number" min = "1" v-bind:max = "Math.ceil(length/15)" v-model = "page" v-on:keyup.enter="changePage()"/> 
                <div>&nbsp;of {{Math.ceil(length/15)}}</div>
            </div>
            <component :key="renderer" v-bind:is="popup"></component>
        </div>
    </template>


    <style lang="scss">
        @import './Home.scss';
    </style>

    <script src="./Home.js"></script>
