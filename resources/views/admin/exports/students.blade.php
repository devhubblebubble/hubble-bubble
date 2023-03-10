<table>
    <thead>
        <tr>
            <th style="font-weight:bolder;font-size:10px;width: 50px;">Name</th>
            <th style="font-weight:bolder;font-size:10px;width: 50px;">Email</th>
            <th style="font-weight:bolder;font-size:10px;width: 50px;">Mobile</th>
            <th style="font-weight:bolder;font-size:10px;width: 60px;">Age</th>
            <th style="font-weight:bolder;font-size:10px;width: 60px;">Preferred Country</th>
            <th style="font-weight:bolder;font-size:10px;width: 60px;">Preferred University</th>
            <th style="font-weight:bolder;font-size:10px;width: 40px;">Date</th>
        </tr>
    </thead>
    <tbody>
        @if (count(@$students) > 0)
            @foreach (@$students as $student)
                <tr>
                    <td style="width: 40px">
                        {{ ucwords($student->name) }}
                    </td>
                    <td style="width: 40px">
                        {{ @$student->email ?: "--" }}
                    </td>
                    <td>
                        {{ @$student->contact_number ?: "--" }}
                    </td>
                    <td>
                        {{ @$student->age?:'--' }}</td>
                    <td>
                        {{ @$student->prefferedCountry ? implode(", ",json_decode(@$student->prefferedCountry)) : "--" }}
                    </td>
                    <td>
                        {{ @$student->university ? implode(", ",json_decode(@$student->university)) : "--"  }}
                    </td>
                    <td>
                        {{ \Carbon\Carbon::parse(@$student->created_at)->format('d M Y') }}
                    </td>
                </tr>
            @endforeach
        @else
            <tr>
                <td style="text-align: center" colspan="7">
                    No data available on these dates !
                </td>
            </tr>  
        @endif
    </tbody>
</table>
