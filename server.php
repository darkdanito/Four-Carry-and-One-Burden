<?php
	if ($_SERVER["REQUEST_METHOD"] === "POST")
	{
		if (isset($_GET["person"]))
		{
			$person = json_decode($_GET["person"]);
	
			$result = json_encode(array
			(
				"userName" => $person->firstName,
				"password" => $person->lastName)
			);
		}
  		else
  		{
    		$result = "INVALID REQUEST DATA";
  		}

		echo $result;
	}
?>