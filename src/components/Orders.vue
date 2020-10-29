<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <el-table :data="orderList" style="width: 100%" border stripe>
        <el-table-column label="#" type="index" width="50"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号"> </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column prop="pay_status" label="是否付款"> </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="create_time" label="下单时间"> </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope>
            <div>
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="updateAddress"
                >修改地址</el-button
              >
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="wuliu"
                >物流</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 省市区选择 -->
    <el-dialog title="修改地址" :visible.sync="addressDialogVisible" width="50%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="省市区选择" prop="city">
          <el-cascader :options="cityOptions" :value="ruleForm.city"> </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="detail">
          <el-input v-model="ruleForm.detail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 物流选择 -->
    <el-dialog title="修改地址" :visible.sync="wuliuDialogVisible" width="50%">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in wuliuList"
          :key="index"
          :timestamp="item.time"
          placement="bottom"
        >
          {{ item.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>
<script>
import cityOptions from '@/components/citydata';
import axios from 'axios';

export default {
  name: 'Orders',
  data() {
    return {
      total: 0,
      orderList: [],
      addressDialogVisible: false,
      wuliuDialogVisible: false,
      ruleForm: {
        city: [],
        detail: '',
      },
      cityOptions: cityOptions,
      wuliuList: [],
      rules: {
        city: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        detail: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.get('orders', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 5,
        },
      });
      this.orderList = res.data.goods;
      this.total = res.data.total;
    },
    updateAddress() {
      this.addressDialogVisible = true;
    },
    async wuliu() {
      const { data: res } = await axios.get(
        'https://www.liulongbin.top:8888/api/private/v1/kuaidi/804909574412544580'
      );
      this.wuliuList = res.data;
      this.wuliuDialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped></style>
