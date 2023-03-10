<?php

namespace App\Exports;

use App\Models\StudentPersonalInfo;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithCustomValueBinder;
use PhpOffice\PhpSpreadsheet\Cell\Cell;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Cell\DefaultValueBinder;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;

class StudentsExport extends DefaultValueBinder implements FromView, WithCustomValueBinder, WithEvents
{
    protected $students;

    /**
     * Injecting constructor level Dependencies
     */

    public function __construct($students)
    {
        $this->students = $students;
    }

    public function view(): View {
        return view('admin.exports.students', [ 'students' => $this->students ]);
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                // Name
                $event->sheet->getDelegate()->getColumnDimension('A')->setWidth(40);
                // Email
                $event->sheet->getDelegate()->getColumnDimension('B')->setWidth(30);
                // Mobile
                $event->sheet->getDelegate()->getColumnDimension('C')->setWidth(20);
                // Age
                $event->sheet->getDelegate()->getColumnDimension('D')->setWidth(10);
                // Preferred Country
                $event->sheet->getDelegate()->getColumnDimension('E')->setWidth(40);
                // Preferred University
                $event->sheet->getDelegate()->getColumnDimension('F')->setWidth(40);
                // Date
                $event->sheet->getDelegate()->getColumnDimension('G')->setWidth(30);
            },
        ];
    }

    public function bindValue(Cell $cell, $value)
    {
        if (is_numeric($value)) {
            $cell->setValueExplicit($value, DataType::TYPE_STRING);

            return true;
        }
        return parent::bindValue($cell, $value);
    }
}
