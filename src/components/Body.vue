<template>
  <div>

    
    <p>
      Hi {{ name }}
    </p>


    <h4>New Request</h4>
    <input type="text" v-model="newBoardName" />
    <button @click="onNewBoardClk">Create</button>


    <br /><br />


    <button @click="refresh">Refresh</button>

    <h4>Active Requests</h4>

    <table style="width:100%">

      <tr>
        <th>Name</th>
        <th>Total Budget</th>
        <th>Best Budget</th>
        <th>Total Items</th>
        <th>Items Ordered</th>
        <th>Items Delivered</th>
        <th>Bid Received</th>
        <th>Vendor Pool</th>
      </tr>

      <tr v-for="row in rows" :key="row.name">
        <td>{{ row.name }}</td>
        <td>$42</td>
        <td>$32</td>
        <td>32</td>
        <td>12</td>
        <td>1</td>
        <td>6</td>
        <td>+</td>
      </tr>
      
    </table>


    <br /><br />

  </div>
</template>

<script>

let ctx;

export default {
  data () {
    return {
      name: null,
      newBoardName: "My new request",
      rows: []
    };
  },
  async mounted () {
    let res = await this.monday.api('query { me { name } }');
    this.name = res.data.me.name;

    this.monday.listen("context", async (res) => {
      ctx = res.data;
    });

    this.refresh();

  },
  methods: {
    async refresh() {
      while(!ctx) await this.wait(200);

      let boardId = ctx.boardId;
      let queryStr = `query { boards (ids: ${boardId}) { name items { name id } } }`;
      console.log(queryStr);
      let res = await this.monday.api(queryStr);
      console.log(res.data);
      this.rows = res.data.boards[0].items;
    },
    async onNewBoardClk() {
      if(!this.newBoardName || this.newBoardName === "") return;
      while(!ctx) await this.wait(200);

      let mutStr;
      let res;

      mutStr = `mutation { create_board (board_name: "${this.newBoardName}", board_kind: private) { id } }`;
      res = await this.monday.api(mutStr);
      console.log(res.data);

      let newBoardId = res.data.create_board.id;

      mutStr = `mutation { create_column (board_id: ${newBoardId}, title: "Specifications", column_type: long_text) { id } }`;
      res = await this.monday.api(mutStr);
      console.log(res.data);

      mutStr = `mutation { create_column (board_id: ${newBoardId}, title: "Units", column_type: dropdown) { id } }`;
      res = await this.monday.api(mutStr);
      console.log(res.data);

      mutStr = `mutation { create_column (board_id: ${newBoardId}, title: "Quantity", column_type: numbers) { id } }`;
      res = await this.monday.api(mutStr);
      console.log(res.data);

      mutStr = `mutation { create_column (board_id: ${newBoardId}, title: "Rate", column_type: numbers) { id } }`;
      res = await this.monday.api(mutStr);
      console.log(res.data);

      mutStr = `mutation { create_column (board_id: ${newBoardId}, title: "Budget", column_type: numbers) { id } }`;
      res = await this.monday.api(mutStr);
      console.log(res.data);

      mutStr = `mutation { create_column (board_id: ${newBoardId}, title: "People", column_type: people) { id } }`;
      res = await this.monday.api(mutStr);
      console.log(res.data);

      mutStr = `mutation { create_column (board_id: ${newBoardId}, title: "Sample Images", column_type: integration) { id } }`;
      res = await this.monday.api(mutStr);
      console.log(res.data);

      mutStr = `mutation { create_column (board_id: ${newBoardId}, title: "Attachments", column_type: integration) { id } }`;
      res = await this.monday.api(mutStr);
      console.log(res.data);

      mutStr = `mutation { create_column (board_id: ${newBoardId}, title: "Status", column_type: status) { id } }`;
      res = await this.monday.api(mutStr);
      console.log(res.data);

    }
  }
}
</script>

<style scoped>
</style>
