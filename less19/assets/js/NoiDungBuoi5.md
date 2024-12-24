# NỘI DUNG BUỔI 5

## Giải quyết bài toán phân tích thực tế

Buổi 5 học viên sẽ thực hành giải quyết bài toán phân tích dữ liệu thực tế, Q&A trao đổi chia sẻ và làm bài kiểm tra cuối khóa.

**Nội dung**

1. Thực hành SQL để truy vấn dữ liệu theo yêu cầu
2. Bài toán: Phân tích dữ liệu chuỗi thời gian (Time Series Analysis)
3. Bài kiểm tra cuối khóa

**Thực hành**

1. Thực hành SQL để truy vấn dữ liệu theo yêu cầu
2. Tổng hợp doanh số theo thời gian
3. Phân tích xu hướng doanh số của ngành hàng Bikes theo thời gian
4. Phân tích xu hướng doanh số của các ngành hàng theo thời gian
5. Phân tích chênh lệch doanh số/tỉ lệ doanh số/% doanh số tổng của ngành hàng Bikes và nhóm các ngành hàng còn lại theo thời gian

## Chuẩn bị thực hành

Để chuẩn bị cho phần thực hành buổi 5, các bạn cần cài đặt trước phần mềm SQL Server Management Studio hoặc Azure Data Studio. Đồng thời, sử dụng thông tin sau để truy cập vào cơ sở dữ liệu SQL Server do KPIM cung cấp:

- **Server**: 222.252.14.117
- **Username**: hocviensql
- **Password**: sqlherokpim

Cơ sở dữ liệu chúng ta sẽ sử dụng trong phần thực hành là AdventureWorks2019.

## Bước 1: Thực hành SQL để truy vấn dữ liệu theo yêu cầu

### 1.1

- **Yêu cầu**: Lấy danh sách sản phẩm thỏa mãn các điều kiện sau
  - Mã sản phẩm bắt đầu bằng cụm **FR**, kết thúc là **2 chữ số**
  - Sản phẩm có màu trắng, màu đỏ hoặc màu đen
- **Nguồn dữ liệu**: Bảng **Production.Product**
- **Gợi ý**: LIKE, AND, IN
- **Kết quả**: Bảng kết quả có 42 dòng.
    ![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_002.png)

### 1.2

- **Yêu cầu**: Lấy danh sách các sản phẩm bán ra có số lượng tồn kho bé hơn hoặc bằng mức tồn kho tối thiểu đã quy định
- Nguồn dữ liệu: Bảng Production.Product, bảng Production.ProductInventory
    Trong bảng **Product**
  - cột **FinishedGoodsFlag** để đánh dấu có phải sản phẩm bán ra hay không
  - cột **ReorderPoint** quy định số lượng tồn kho tối thiểu của một sản phẩm
- **Gợi ý**: WITH, CASE WHEN, JOIN, ORDER BY
- **Kết quả**: Bảng kết quả có 6 dòng.
  ![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_003.png)

### 1.3

- **Yêu cầu**: Tính doanh thu các cửa hàng ở châu Âu **(Group = Europe)** trong năm **2023** đồng thời chỉ lọc các cửa hàng có doanh thu trên **$100000** và lấy thêm thông tin liên hệ của các cửa hàng đại lý đó
- **Nguồn dữ liệu**: Bảng Sales.SalesOrderHeader, bảng Sales.SalesOrderDetail, bảng Sales.SalesTerritory, Sales.vStoreWithContacts
- **Kết quả**: Dữ liệu có 27 dòng.
  ![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_004.png)

### 1.4

- **Yêu cầu**: Thực hiện phân loại sản phẩm thuộc ngành hàng **Bikes** mỗi năm dựa trên số lượng sản phẩm bán ra. Nếu sản phẩm bán ra lớn hơn hoặc bằng mức trung bình của toàn ngành thì gán nhãn là **Cao** còn ngược lại thì là **Thấp**
- **Nguồn dữ liệu**: Bảng Sales.SalesOrderHeader, bảng Sales.SalesOrderDetail
- **Kết quả**: Bảng kết quả có 227 dòng.
  ![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_005.png)

### 1.5

- **Yêu cầu**: Thống kê số lượng sản phẩm bán ra mỗi năm của nhóm ngành **Bikes** theo nhóm sản phẩm, màu sắc và kích thước
- **Nguồn dữ liệu**: Bảng Sales.SalesOrderHeader, bảng Sales.SalesOrderDetail
- **Kết quả**: Bảng kết quả có 137 dòng.
  ![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_006.png)

## Bước 2: Tổng hợp doanh số theo thời gian

### 2.1

- **Yêu cầu**: Viết câu truy vấn sau để lấy **doanh số tổng theo năm**.

```sql
-- Phân tích doanh số tổng theo năm
SELECT FORMAT(OrderDate, 'yyyy') as Year, ROUND(SUM(LineTotal), 0) as SalesAmount
FROM Sales.SalesOrderDetail d
JOIN Sales.SalesOrderHeader h on h.SalesOrderID = d.SalesOrderID
GROUP BY FORMAT(OrderDate, 'yyyy')
ORDER BY Year
```

- **Kết quả**: Bảng dữ liệu có 4 dòng.
  ![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_007.png)

### 2.2

- **Yêu cầu**: Viết câu truy vấn sau để lấy **doanh số tổng theo tháng**.

```sql
-- 1.2. Doanh số qua từng tháng
SELECT FORMAT(OrderDate, 'yyyy-MM') as YearMonth, EOMONTH(OrderDate) AS EndDate,
ROUND(SUM(LineTotal), 0) as SalesAmount
FROM Sales.SalesOrderDetail d
JOIN Sales.SalesOrderHeader h on h.SalesOrderID = d.SalesOrderID
GROUP BY FORMAT(OrderDate, 'yyyy-MM'), EOMONTH(OrderDate)
ORDER BY YearMonth, EndDate
```

- **Kết quả**: Bảng dữ liệu có 38 dòng.
  ![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_008.png)

## Bước 3: Phân tích xu hướng doanh số của ngành hàng Bikes theo thời gian

### 3.1

- **Yêu cầu**: Viết câu truy vấn sau để lấy **doanh số ngành hàng Bikes theo năm**.
- **Phân tích**: **Bikes** là ngành hàng quan trọng nhất, đóng góp phần lớn vào doanh số của công ty.

```sql
-- 3.1. Doanh số của ngành hàng 'Bikes' qua từng năm
SELECT FORMAT(OrderDate, 'yyyy') as Year, c.ProductCategoryID, c.Name as ProductCategoryName,
ROUND(SUM(LineTotal), 0) as SalesAmount
FROM Sales.SalesOrderDetail d
JOIN Sales.SalesOrderHeader h on h.SalesOrderID = d.SalesOrderID
JOIN Production.Product p on d.ProductID = p.ProductID
JOIN Production.ProductSubcategory sc on p.ProductSubcategoryID = sc.ProductSubcategoryID
JOIN Production.ProductCategory c on sc.ProductCategoryID = c.ProductCategoryID
WHERE c.Name = 'Bikes'
GROUP BY FORMAT(OrderDate, 'yyyy'), c.ProductCategoryID, c.Name
ORDER BY Year, c.ProductCategoryID
```

- **Kết quả**: Bảng dữ liệu có 4 dòng.
 ![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_009.png)

### 3.2

- **Yêu cầu**: Viết câu truy vấn sau để lấy **doanh số ngành hàng Bikes theo tháng**

```sql
SELECT FORMAT(OrderDate, 'yyyy-MM') as YearMonth, EOMONTH(OrderDate) AS EndDate, c.ProductCategoryID, c.Name as ProductCategoryName,
ROUND(SUM(LineTotal), 0) as SalesAmount
FROM Sales.SalesOrderDetail d
JOIN Sales.SalesOrderHeader h on h.SalesOrderID = d.SalesOrderID
JOIN Production.Product p on d.ProductID = p.ProductID
JOIN Production.ProductSubcategory sc on p.ProductSubcategoryID = sc.ProductSubcategoryID
JOIN Production.ProductCategory c on sc.ProductCategoryID = c.ProductCategoryID
WHERE c.Name = 'Bikes'
GROUP BY FORMAT(OrderDate, 'yyyy-MM'), EOMONTH(OrderDate), c.ProductCategoryID, c.Name
ORDER BY YearMonth, c.ProductCategoryID
```

- **Kết quả**: Bảng dữ liệu có 37 dòng.
  ![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_010.png)

## Bước 4: Phân tích xu hướng doanh số của các ngành hàng theo thời gian

### 4.1

- **Yêu cầu**: Viết câu truy vấn sau để **lấy doanh số ngành hàng Bikes và nhóm các ngành hàng còn lại theo năm**
- Phân tích: Do các ngành hàng **Components**, **Clothing**, **Accesseries** có doanh số khá nhỏ khi so sánh với ngành hàng **Bikes** nên gộp các ngành hàng này vào chung một nhóm gọi là **Others**

```sql
SELECT [Year], ProductCategoryID, ProductCategoryName, CONVERT(DECIMAL(18,0), SUM(LineTotal)) as SalesAmount
FROM
(SELECT FORMAT(OrderDate, 'yyyy') as Year,
CASE WHEN c.Name='Bikes' THEN c.ProductCategoryID ELSE 0 END AS ProductCategoryID,
CASE WHEN c.Name='Bikes' THEN c.Name ELSE 'Others' END AS ProductCategoryName,
LineTotal
FROM Sales.SalesOrderDetail d
JOIN Sales.SalesOrderHeader h on h.SalesOrderID = d.SalesOrderID
JOIN Production.Product p on d.ProductID = p.ProductID
JOIN Production.ProductSubcategory sc on p.ProductSubcategoryID = sc.ProductSubcategoryID
JOIN Production.ProductCategory c on sc.ProductCategoryID = c.ProductCategoryID
) s
GROUP BY Year, ProductCategoryID, ProductCategoryName
ORDER BY Year, ProductCategoryID
```

- **Kết quả**: Bảng dữ liệu có 8 dòng.
    ![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_011.png)

### 4.2

- **Yêu cầu**: Viết câu truy vấn sau để lấy doanh số ngành hàng Bikes và nhóm các ngành hàng còn lại theo tháng trong năm 2012 và 2013

```sql
SELECT YearMonth, EndDate, ProductCategoryID, ProductCategoryName, CONVERT(DECIMAL(18,0), SUM(LineTotal)) as SalesAmount
FROM
(SELECT FORMAT(OrderDate, 'yyyy-MM') as YearMonth, EOMONTH(OrderDate) AS EndDate,
    CASE WHEN c.Name='Bikes' THEN c.ProductCategoryID ELSE 0 END AS ProductCategoryID,
    CASE WHEN c.Name='Bikes' THEN c.Name ELSE 'Others' END AS ProductCategoryName,
    LineTotal
    FROM Sales.SalesOrderDetail d
    JOIN Sales.SalesOrderHeader h on h.SalesOrderID = d.SalesOrderID
    JOIN Production.Product p on d.ProductID = p.ProductID
    JOIN Production.ProductSubcategory sc on p.ProductSubcategoryID = sc.ProductSubcategoryID
    JOIN Production.ProductCategory c on sc.ProductCategoryID = c.ProductCategoryID
    WHERE YEAR(OrderDate) IN (2012, 2013)
) s
GROUP BY YearMonth, EndDate, ProductCategoryID, ProductCategoryName
ORDER BY YearMonth, EndDate, ProductCategoryID
```

- **Kết quả**: Bảng dữ liệu có 48 dòng.
![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_012.png)

## Bước 5: Phân tích chênh lệch doanh số/tỉ lệ doanh số/phần trăm doanh số tổng của ngành hàng Bikes và nhóm các ngành hàng còn lại theo thời gian

### 5.1

- **Yêu cầu**: Viết câu truy vấn sau để **tính các chỉ số theo năm**

```sql
;WITH s AS (
SELECT [Year], ProductCategoryID, ProductCategoryName, CONVERT(DECIMAL(18,0), SUM(LineTotal)) as SalesAmount
    FROM
    (SELECT FORMAT(OrderDate, 'yyyy') as Year,
        CASE WHEN c.Name='Bikes' THEN c.ProductCategoryID ELSE 0 END AS ProductCategoryID,
        CASE WHEN c.Name='Bikes' THEN c.Name ELSE 'Others' END AS ProductCategoryName,
        LineTotal
        FROM Sales.SalesOrderDetail d
        JOIN Sales.SalesOrderHeader h on h.SalesOrderID = d.SalesOrderID
        JOIN Production.Product p on d.ProductID = p.ProductID
        JOIN Production.ProductSubcategory sc on p.ProductSubcategoryID = sc.ProductSubcategoryID
        JOIN Production.ProductCategory c on sc.ProductCategoryID = c.ProductCategoryID
    ) s
    GROUP BY Year, ProductCategoryID, ProductCategoryName
    -- ORDER BY Year, ProductCategoryID
), yearly AS (
SELECT [Year],
    SUM(CASE WHEN ProductCategoryName='Bikes' THEN SalesAmount ELSE 0 END) AS Bikes,
    SUM(CASE WHEN ProductCategoryName='Others' THEN SalesAmount ELSE 0 END) AS Others,
    SUM(SalesAmount) AS [Total]
    FROM s
    GROUP BY [Year]
)
SELECT [Year], Bikes - Others AS Difference, ROUND(Bikes / Others, 1) AS Ratio,
ROUND(Bikes *100 / Total, 2) AS BikesPercentOfTotal, ROUND(Others* 100 / Total, 2) AS OthersPercentOfTotal
FROM yearly
ORDER BY [YEAR]
```

- **Kết quả**: Bảng dữ liệu có 4 dòng.
  ![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_013.png)
  ![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_014.png)

### 5.2

- **Yêu cầu**: Viết câu truy vấn sau để tính các chỉ số theo tháng trong năm 2012 và 2013.

```sql
;WITH s AS (
SELECT YearMonth, EndDate, ProductCategoryID, ProductCategoryName, CONVERT(DECIMAL(18,0), SUM(LineTotal)) as SalesAmount
    FROM
    (SELECT FORMAT(OrderDate, 'yyyy-MM') as YearMonth, EOMONTH(OrderDate) AS EndDate,
        CASE WHEN c.Name='Bikes' THEN c.ProductCategoryID ELSE 0 END AS ProductCategoryID,
        CASE WHEN c.Name='Bikes' THEN c.Name ELSE 'Others' END AS ProductCategoryName,
        LineTotal
        FROM Sales.SalesOrderDetail d
        JOIN Sales.SalesOrderHeader h on h.SalesOrderID = d.SalesOrderID
        JOIN Production.Product p on d.ProductID = p.ProductID
        JOIN Production.ProductSubcategory sc on p.ProductSubcategoryID = sc.ProductSubcategoryID
        JOIN Production.ProductCategory c on sc.ProductCategoryID = c.ProductCategoryID
        WHERE YEAR(OrderDate) IN (2012, 2013)
    ) s
    GROUP BY YearMonth, EndDate, ProductCategoryID, ProductCategoryName
    --ORDER BY YearMonth, EndDate, ProductCategoryID
), monthly AS (
SELECT YearMonth, EndDate,
    SUM(CASE WHEN ProductCategoryName='Bikes' THEN SalesAmount ELSE 0 END) AS Bikes,
    SUM(CASE WHEN ProductCategoryName='Others' THEN SalesAmount ELSE 0 END) AS Others,
    SUM(SalesAmount) AS [Total]
    FROM s
    GROUP BY YearMonth, EndDate
)
SELECT YearMonth, EndDate, Bikes - Others AS Difference, ROUND(Bikes / Others, 1) AS Ratio,
ROUND(Bikes *100 / Total, 2) AS BikesPercentOfTotal, ROUND(Others* 100 / Total, 2) AS OthersPercentOfTotal
FROM monthly
ORDER BY YearMonth, EndDate
```

- **Kết quả**: Bảng dữ liệu có 24 dòng.
    ![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_015.png)
    ![image](https://res.cloudinary.com/dvcm0tqlf/image/upload/_SQL_CoBan/Buoi05/NoiDungBuoi05_images/images_016.png)
