import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) { }

  // Hàm chuyển đổi số lượng ETH sang wei
  static ethToWei(ethAmount: number): bigint {
    // 1 ETH = 10^18 wei
    const weiPerEth = BigInt("1000000000000000000"); // Số nguyên lớn để xử lý số lượng lớn

    // Chuyển đổi số lượng ETH sang wei
    const weiAmount = BigInt(ethAmount) * weiPerEth;

    return weiAmount;
  }

  static extractEthAmount(inputString: string): number {
    // Biểu thức chính quy để trích xuất số lượng ETH
    const regex = /^(\d+(\.\d+)?) ETH/;

    // Sử dụng biểu thức chính quy để trích xuất số lượng ETH từ chuỗi
    const match = inputString.match(regex);

    // Kiểm tra xem có tìm thấy khớp hay không và trả về giá trị ETH nếu có
    if (match) {
      const ethAmount = parseFloat(match[1]); // Lấy giá trị ETH từ kết quả khớp
      return ethAmount;
    } else {
      return 0; // Trả về null nếu không tìm thấy số lượng ETH trong chuỗi
    }
  }

  static convertToMySQLDateTime(dateString) {
    const months = {
      "January": "01", "February": "02", "March": "03", "April": "04",
      "May": "05", "June": "06", "July": "07", "August": "08",
      "September": "09", "October": "10", "November": "11", "December": "12"
    };

    const parts = dateString.split(" ");
    const month = months[parts[0]];
    const day = parts[1].replace(",", "");
    const year = parts[2].replace(",", "");
    const time = parts[4];

    const formattedDate = `${year}-${month}-${day} ${time}`;

    return formattedDate;
  }

}
