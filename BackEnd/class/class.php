<?php
  class DB {
    private $host = "localhost";
    private $login = "mysql";
    private $password = "mysql";
    private $dbname = "diplom";
    public $conn;

    public function __construct() {
      $this->conn = new mysqli($this->host, $this->login, $this->password, $this->dbname);
    }

    public function GetList($tablename = '', $filter=[], $select = [], $order=[], $top=0, $limit=0) {
        if($tablename){
            $sql = '';
            if($filter){
                $filter_sql = '';
                foreach($filter as $key => $val){
                    if(is_array($val)){
                        if($filter_sql){
                            $filter_sql .= ' AND ' . $key . ' IN ("' . implode('","', $val) . '")';
                        }else{
                            $filter_sql .= $key . ' IN ("' . implode('","', $val) . '")';
                        }
                    }else{
                        if(strpos($key, '>=') !== false){
                            $operator = '>=';
                            $key = str_replace('>=', '', $key);
                        }elseif(strpos($key, '<=') !== false){
                            $operator = '<=';
                            $key = str_replace('<=', '', $key);
                        }elseif(strpos($key, '!') !== false){
                            $operator = '<>';
                            $key = str_replace('!', '', $key);
                        }elseif(strpos($key, '>') !== false){
                            $operator = '>';
                            $key = str_replace('>', '', $key);
                        }elseif(strpos($key, '<') !== false){
                            $operator = '<';
                            $key = str_replace('<', '', $key);
                        }else{
                            $operator = '=';
                        }

                        if($filter_sql){
                            $filter_sql .= ' AND ' . $key . $operator . '"' . $val . '"';
                        }else{
                            $filter_sql .= $key . $operator . '"' . $val . '"';
                        }
                    }
                }
                $filter_sql = 'WHERE ' . $filter_sql;
            }else{
                $filter_sql = '';
            }
            if($select){
                $select_sql = '';
                foreach($select as $val){
                    if($select_sql){
                        $select_sql .= ', ' . $val;
                    }else{
                        $select_sql .= $val;
                    }
                }
            }else{
                $select_sql = '*';
            }
            if($order){
                $order_sql = '';
                foreach($order as $key => $val){
                    if($order_sql){
                        $order_sql .= ', ' . $key . ' ' . $val;
                    }else{
                        $order_sql .= $key . ' ' . $val;
                    }
                }
                $order_sql = 'ORDER BY ' . $order_sql;
            }else{
                $order_sql = '';
            }
            if($top && $limit){
                $limit_sql = 'LIMIT ' . $top . ', ' . $limit;
            }
            elseif($limit){
                $limit_sql = 'LIMIT ' . $limit;
            }else{
                $limit_sql = '';
            }
            $sql = 'SELECT ' . $select_sql . ' FROM ' . $tablename . ' ' . $filter_sql . ' ' . $order_sql . ' ' . $limit_sql;

            // return $sql;
            if($result = $this->conn->query($sql)){
                return $result->fetch_all(MYSQLI_ASSOC);
            }else{
                return $result->error;
            }
        }else{
            return 'ERROR: Название таблицы не определено!';
        }
    }

    public function GetById($tablename = '', $id=0, $select = []) {
        if($tablename){
            if($id){
                $sql = '';
                if($select){
                    $select_sql = '';
                    foreach($select as $val){
                        if($select_sql){
                            $select_sql .= ', ' . $val;
                        }else{
                            $select_sql .= $val;
                        }
                    }
                }else{
                    $select_sql = '*';
                }
                $sql = 'SELECT ' . $select_sql . ' FROM ' . $tablename . ' WHERE ID=' . $id;

                // return $sql;
                if($result = $this->conn->query($sql)){
                    $result = $result->fetch_all(MYSQLI_ASSOC);
                    return $result[0];
                }else{
                    return $result->error;
                }
            }else{
                return 'ERROR: ID не определено!';
            }
        }else{
            return 'ERROR: Название таблицы не определено!';
        }
    }

    public function GetId($tablename = '', $filter = []) {
        if($tablename){
            $sql = '';
            if($filter){
                $filter_sql = '';
                foreach($filter as $key => $val){
                    if(is_array($val)){
                        if($filter_sql){
                            $filter_sql .= ' AND ' . $key . ' IN ("' . implode('","', $val) . '")';
                        }else{
                            $filter_sql .= $key . ' IN ("' . implode('","', $val) . '")';
                        }
                    }else{
                        if(strpos($key, '>=') !== false){
                            $operator = '>=';
                            $key = str_replace('>=', '', $key);
                        }elseif(strpos($key, '<=') !== false){
                            $operator = '<=';
                            $key = str_replace('<=', '', $key);
                        }elseif(strpos($key, '!') !== false){
                            $operator = '<>';
                            $key = str_replace('!', '', $key);
                        }elseif(strpos($key, '>') !== false){
                            $operator = '>';
                            $key = str_replace('>', '', $key);
                        }elseif(strpos($key, '<') !== false){
                            $operator = '<';
                            $key = str_replace('<', '', $key);
                        }else{
                            $operator = '=';
                        }

                        if($filter_sql){
                            $filter_sql .= ' AND ' . $key . $operator . '"' . $val . '"';
                        }else{
                            $filter_sql .= $key . $operator . '"' . $val . '"';
                        }
                    }
                }
                $filter_sql = 'WHERE ' . $filter_sql;
            }else{
                $filter_sql = '';
            }
            $sql = 'SELECT ID FROM ' . $tablename . ' ' . $filter_sql;

            // return $sql;
            if($result = $this->conn->query($sql)){
                $result = $result->fetch_all(MYSQLI_ASSOC);
                return $result[0]['ID'];
            }else{
                return $result->error;
            }
        }else{
            return 'ERROR: Название таблицы не определено!';
        }
    }

    public function Update($tablename, $id, $arFields=[]) {
        if($tablename){
            if($id){
                $sql = '';

                foreach($arFields as $key => $field){
                    if($sql){
                        $sql .= ', ' . $key . '="' . $field . '"';
                    }else{
                        $sql .= $key . '="' . $field . '"';
                    }
                }

                $sql = 'UPDATE ' . $tablename . ' SET ' . $sql . ' WHERE ID=' . $id;

                // return $sql;
                if($result = $this->conn->query($sql)){
                    return 'success';
                }else{
                    return $result->error;
                }
            }else{
                return 'ERROR: ID не определено!';
            }
        }else{
            return 'ERROR: Название таблицы не определено!';
        }
    }

    public function Add($tablename, $arFields=[]) {
        if($tablename){
            $sql = '';

            $keys_sql = '';
            $values_sql = '';
            foreach($arFields as $key => $field){
                if($key == 'ID' || $key == 'id') continue;
                if($keys_sql){
                    $keys_sql .= ', ' . $key;
                }else{
                    $keys_sql .= $key;
                }
                if($values_sql){
                    $values_sql .= ', "' . $field . '"';
                }else{
                    $values_sql .= '"' . $field . '"';
                }
            }

            $sql = 'INSERT INTO ' . $tablename . ' (' . $keys_sql . ') VALUES (' . $values_sql . ')';

            // return $sql;
            if($result = $this->conn->query($sql)){
                return 'success';
            }else{
                return 'no';
                return $result->error;
            }
        }else{
            return 'ERROR: Название таблицы не определено!';
        }
    }
  }
?>